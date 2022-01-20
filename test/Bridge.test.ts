import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
const { expect } = require("chai");
const { ethers } = require("hardhat");
import { Contract, ContractFactory } from "ethers";
const testData  = require("./fixtures/nft-metadata.json");

describe('Bridge contract', () => {
    let 
        Token: ContractFactory, 
        token1: Contract, 
        token2: Contract, 
        bridge1: Contract, 
        bridge2: Contract, 
        Bridge: ContractFactory, 
        owner: SignerWithAddress, 
        addr1: SignerWithAddress, 
        addr2: SignerWithAddress;
       
    const zero_address = "0x0000000000000000000000000000000000000000";
    const ramsesURI = (testData.metadata).toString();
    const ownerTokenId: Number = 1;
    const addr1TokenId: Number = 2;

    const nonce: Number = 3;
    const chainTo: Number = 97;

    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM721");
        Bridge = await ethers.getContractFactory("Bridge"); 
        
    });
    
    beforeEach(async () => {
        token1 = await Token.connect(owner).deploy();
        await token1.deployed();

        bridge1 = await Bridge.connect(owner).deploy(owner.address, token1.address);
        await bridge1.deployed();

        token2 = await Token.connect(owner).deploy();
        await token2.deployed();

        bridge2 = await Bridge.connect(owner).deploy(owner.address, token2.address);
        await bridge2.deployed();
        
        await token1.connect(owner).createToken(owner.address,ramsesURI);
        await token1.connect(owner).createToken(addr1.address,ramsesURI);

        await token2.connect(owner).createToken(owner.address,ramsesURI);
        await token2.connect(owner).createToken(addr1.address,ramsesURI);
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token1.name()).to.equal("Metaverse Token");
        });

        it('Should set right symbol', async () => {
            expect(await token1.symbol()).to.equal("MET");
        }); 

        it('Should set right owner for tokens', async () => {
            expect(await token1.owner()).to.equal(owner.address);
        });

        it('Should set right balance for owner address and addr1 address', async () => {
            expect(await token1.balanceOf(owner.address)).to.equal(1);
            expect(await token1.balanceOf(addr1.address)).to.equal(1);        
        });
    });

    describe('Transactions', () => {
        it('swap: should swap tokens', async () => {
            await token1.connect(addr1).setApprovalForAll(bridge1.address, true);

            await expect(bridge1.connect(addr1).swap(addr1TokenId, chainTo, nonce))
            .to.emit(bridge1, "SwapInitialized")
            .withArgs(addr1.address, addr1TokenId, 31337, chainTo, nonce);
            let finalBalance = await token1.connect(addr1).balanceOf(addr1.address);
            expect(0).to.equal(finalBalance);
        });

        it('redeem: should redeem token', async () => { 
            const types = [
                'address', 'uint256', 'uint256', 'uint256', 'uint256',
              ];
        
            const values = [
                addr1.address, addr1TokenId, 31337, chainTo, nonce
            ];

            const hash = ethers.utils.solidityKeccak256(types, values);
            const sign = await owner.signMessage(ethers.utils.arrayify(hash));
            const { v, r, s } = ethers.utils.splitSignature(sign);
            
            await token1.connect(addr1).setApprovalForAll(bridge1.address, true);
            await bridge1.connect(addr1).swap(addr1TokenId, chainTo, nonce);    
            
            await expect(bridge1.connect(addr1).redeem(addr1TokenId, 97, nonce, v, r, s))
            .to.emit(token1,"Transfer")
            .withArgs(bridge1.address, addr1.address,  addr1TokenId).and
            .to.emit(bridge1, "SwapRedeemed")
            .withArgs(addr1.address, addr1TokenId, 97, 31337, nonce)
        });
    });
});
