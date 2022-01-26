import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";
const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");
import {
    ACDM721__factory,
    ACDM721,
  } from "../typechain-types";

describe('ERC721 contract', () => {
    let 
    Token: ACDM721__factory, 
    token: ACDM721, 
    owner: SignerWithAddress, 
    addr1: SignerWithAddress, 
    addr2: SignerWithAddress;
    
    const adminRole = ethers.constants.HashZero;
    const zero_address = "0x0000000000000000000000000000000000000000";
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const ramsesURI = (testData.metadata).toString();
    
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();   
    });
    
    beforeEach(async () => {
        token = await new ACDM721__factory(owner).deploy();
        await token.deployed(); 
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token.name()).to.equal("Metaverse Token");
        });

        it('Should set right symbol', async () => {
        expect(await token.symbol()).to.equal("MET");
        }); 

        it('Should set admin role for owner', async () => {
            expect(await token.hasRole(minterRole, owner.address)).to.equal(true);
        }); 
    });

    describe('Transactions', () => {
        it('Mint: should mint token to addr1', async () => {
            await expect(token.connect(owner).createToken(addr1.address, ramsesURI))
            .to.emit(token, "Transfer")
            .withArgs(zero_address, addr1.address, 1);
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(addr1Balance).to.equal("1");
        });

        it('Approve: should approve token from addr1 to owner and emit "Approval" event', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            
            await expect(token.connect(addr1).approve(owner.address,1))
            .to.emit(token, "Approval")
            .withArgs(addr1.address, owner.address, 1);

            await token.connect(owner).transferFrom(addr1.address, owner.address, 1);
               
            const addr1Balance = await token.balanceOf(addr1.address);
            const ownerBalance = await token.balanceOf(owner.address);

            expect(addr1Balance).to.equal("0");
            expect(ownerBalance).to.equal("1");
        });

        it('Approve: should revert with "ERC721: transfer caller is not owner nor approved"', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            
            await expect(token.connect(owner).transferFrom(addr1.address, owner.address, 1))
            .to
            .be
            .revertedWith('ERC721: transfer caller is not owner nor approved');
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(addr1Balance).to.equal("1");
        });

        it('setApprovalForAll: should approve all addr1 tokens to owner and emit "ApprovalForAll" event', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            await expect(token.connect(addr1).setApprovalForAll(owner.address, true))
            .to.emit(token, "ApprovalForAll")
            .withArgs(addr1.address, owner.address, true);

            await token.connect(owner).transferFrom(addr1.address, owner.address, 1);
            await token.connect(owner).transferFrom(addr1.address, owner.address, 2);
            
            const addr1Balance = await token.balanceOf(addr1.address);
            const ownerBalance = await token.balanceOf(owner.address);

            expect(addr1Balance).to.equal("0");
            expect(ownerBalance).to.equal("2");
        });

        it('TransferFrom: should transfer tokens betwen accounts', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            await token.connect(addr1).setApprovalForAll(owner.address, true);

            await token.connect(owner).transferFrom(addr1.address, owner.address, 1);

            await expect( token.connect(owner).transferFrom(addr1.address, owner.address, 2))
            .to.emit(token, "Transfer")
            .withArgs(addr1.address, owner.address, 2);
                
            const addr1Balance = await token.balanceOf(addr1.address);
            const ownerBalance = await token.balanceOf(owner.address);

            expect(addr1Balance).to.equal("0");
            expect(ownerBalance).to.equal("2");
        });
        
        it('TransferFrom: should be reverted with "ERC721: transfer caller is not owner nor approved"', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            await expect(token.connect(owner).transferFrom(addr1.address, owner.address, 1))
            .to
            .be
            .revertedWith('ERC721: transfer caller is not owner nor approved');
        });

        it('TransferFrom: should be reverted with "ERC721: operator query for nonexistent token"', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            await token.connect(addr1).setApprovalForAll(owner.address,true);

         
            await expect( token.connect(owner).transferFrom(addr1.address, owner.address, 5))
            .to
            .be
            .revertedWith('ERC721: operator query for nonexistent token');
        });
    });

    describe('View functions', () => {
        it('balanceOf: should check balance of address', async () => {
            await expect(token.connect(owner).createToken(addr1.address, ramsesURI))
            .to.emit(token, "Transfer")
            .withArgs(zero_address, addr1.address, 1);
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(addr1Balance).to.equal("1");
        });

        it('getApproved: should approve token from addr1 to owner and emit "Approval" event', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            
            await expect(token.connect(addr1).approve(owner.address,1))
            .to.emit(token, "Approval")
            .withArgs(addr1.address, owner.address, 1);  
            const addr1Balance = await token.getApproved(1);
    
            expect(addr1Balance).to.equal(owner.address);
        });

        it('isApprovalForAll: should approve all addr1 tokens to owner and emit "ApprovalForAll" event', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            await expect(token.connect(addr1).setApprovalForAll(owner.address, true))
            .to.emit(token, "ApprovalForAll")
            .withArgs(addr1.address, owner.address, true);

            const addr1Balance = await token.isApprovedForAll(addr1.address, owner.address);
    
            expect(addr1Balance).to.equal(true);
        });

        it('OwnerOf: should check owner of token', async () => {
            await token.connect(owner).createToken(addr1.address, ramsesURI);
           
            const ownerBalance = await token.ownerOf(1);

            expect(ownerBalance).to.equal(addr1.address);
        });
        
    });
});







