import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");
import {
    ACDM721__factory,
    ACDM721,
    Bridge__factory,
    Bridge
  } from "../typechain-types";

describe('Bridge contract', () => {
    let 
        token: ACDM721, 
        bridge: Bridge, 
        owner: SignerWithAddress, 
        addr1: SignerWithAddress, 
        addr2: SignerWithAddress,
        ownerTokenId: number,
        addr1TokenId: number,
        nonce: number,
        chainTo: number,
        ramsesURI: string;
       
    const zero_address = "0x0000000000000000000000000000000000000000";
    ramsesURI = (testData.metadata).toString();
    ownerTokenId = 1;
    addr1TokenId = 2;
    nonce = 3;
    chainTo = 97;

    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        // token = await new ACDM721__factory(owner).deploy();
        // await token.deployed(); 
        
        // bridge = await new Bridge__factory(owner).deploy(owner.address, token.address);
        // await bridge.deployed();  

        // // console.log(await token.connect(owner).createToken(owner.address,ramsesURI));
        // // console.log(await token.connect(owner).createToken(addr1.address,ramsesURI));
        // await token.connect(owner).createToken(addr1.address,ramsesURI);
        // await token.connect(owner).createToken(addr1.address,ramsesURI);
    });
    
    beforeEach(async () => {
        token = await new ACDM721__factory(owner).deploy();
        await token.deployed(); 
        
        bridge = await new Bridge__factory(owner).deploy(owner.address, token.address);
        await bridge.deployed();  

        // console.log(await token.connect(owner).createToken(owner.address,ramsesURI));
        // console.log(await token.connect(owner).createToken(addr1.address,ramsesURI));
        await token.connect(owner).createToken(owner.address,ramsesURI);
        await token.connect(owner).createToken(addr1.address,ramsesURI);
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token.name()).to.equal("Metaverse Token");
        });

        it('Should set right symbol', async () => {
            expect(await token.symbol()).to.equal("MET");
        }); 

        it('Should set right owner for tokens', async () => {
            expect(await token.owner()).to.equal(owner.address);
        });

        it('Should set right balance for owner address and addr1 address', async () => {
            expect(await token.balanceOf(owner.address)).to.equal(1);
            expect(await token.balanceOf(addr1.address)).to.equal(1);        
        });
    });

    describe('Transactions', () => {
        it('swap: should swap tokens', async () => {
            await token.connect(addr1).setApprovalForAll(bridge.address, true);

            await expect(bridge.connect(addr1).swap(addr1TokenId, chainTo, nonce))
            .to.emit(token,"Transfer")
            .withArgs(addr1.address, bridge.address, addr1TokenId).and
            .to.emit(bridge, "SwapInitialized")
            .withArgs(addr1.address, addr1TokenId, 31337, chainTo, nonce);
            
            let finalBalance = await token.connect(addr1).balanceOf(addr1.address);
            expect(0).to.equal(finalBalance);
        });

        it('swap: should be reverted with "ERC721: transfer caller is not owner nor approved"', async () => {

            await expect(bridge.connect(owner).swap(addr1TokenId, chainTo, nonce))
            .to.be.revertedWith('ERC721: transfer caller is not owner nor approved');
            
            let finalBalance = await token.balanceOf(addr1.address);
            expect(1).to.equal(finalBalance);
        });

        it('swap: should be reverted with "ERC721: operator query for nonexistent token"', async () => {

            await expect(bridge.connect(owner).swap(67, chainTo, nonce))
            .to.be.revertedWith('ERC721: operator query for nonexistent token');
            
            let finalBalance = await token.balanceOf(addr1.address);
            expect(1).to.equal(finalBalance);
        });

        it('redeem: should redeem token', async () => { 
            const types = [
                'address', 'uint256', 'uint256', 'uint256', 'uint256',
              ];
        
            const values = [
                addr1.address, addr1TokenId, 31337, chainTo, nonce
            ];

            const hash = await ethers.utils.solidityKeccak256(types, values);

            const sign = await owner.signMessage(ethers.utils.arrayify(hash));
            const { v, r, s } = ethers.utils.splitSignature(sign);
            // console.log("1 ",await bridge.getValidator(),"~");
            // console.log("2 ",await bridge.connect(addr1).getSigner(hash,v,r,s),"~");
            
            
            console.log(await bridge.validator());
            console.log(await bridge.connect(addr1).checkValidator(hash,v,r,s));
            console.log(await bridge.connect(addr1).redeem(addr1TokenId, 97, nonce, v, r, s));
            console.log(await hash);
            await token.connect(addr1).setApprovalForAll(bridge.address, true);
            await bridge.connect(addr1).swap(addr1TokenId, chainTo, nonce);    
     
            await expect(bridge.connect(addr1).redeem(addr1TokenId, 97, nonce, v, r, s))
            .to.emit(token,"Transfer")
            .withArgs(bridge.address, addr1.address, addr1TokenId).and
            .to.emit(bridge, "SwapRedeemed")
            .withArgs(addr1.address, addr1TokenId, 97, 31337, nonce)
        });

        it('redeem: should be reverted with "Invalid validator signature"', async () => { 
            const types = [
                'address', 'uint256', 'uint256', 'uint256', 'uint256',
              ];
        
            const values = [
                addr1.address, addr1TokenId, 31337, chainTo, nonce
            ];

            const hash = ethers.utils.solidityKeccak256(types, values);

            const sign = await addr1.signMessage(ethers.utils.arrayify(hash));
            const { v, r, s } = ethers.utils.splitSignature(sign);
            
            console.log(await bridge.connect(addr1).checkValidator(hash,v,r,s));
            
            await token.connect(addr1).setApprovalForAll(bridge.address, true);
            await bridge.connect(addr1).swap(addr1TokenId, chainTo, nonce);    
            
            await expect(bridge.connect(owner).redeem(addr1TokenId, 97, nonce, v, r, s))
            .to.be.revertedWith('Invalid validator signature');
        });
    });
});
