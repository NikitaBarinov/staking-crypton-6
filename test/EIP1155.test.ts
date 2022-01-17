import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signers";

describe('ERC1155 contract', () => {
    let Token: ContractFactory,
     token: Contract, 
     owner: SignerWithAddress, 
     addr1: SignerWithAddress, 
     addr2: SignerWithAddress;
  
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM1155");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy();
        await token.deployed();
    });

    describe('Deployment', () => {
        it('Should set admin role for owner', async () => {
            expect(await token.owner()).to.equal(owner.address);
        });   
    });
    
    describe('Transactions', () => {
        it('Mint: should minted 5 of 1st tokens to addr1', async () => {
            await token.connect(owner)
                .mintBatch(
                    addr1.address,
                    [1, 3],
                    [5, 6],
                    []
                );
            const firstAddr1Balance = await token.balanceOf(addr1.address, 1);
            expect(firstAddr1Balance).to.equal("5");
            const secondAddr1Balance = await token.balanceOf(addr1.address, 3);
            expect(secondAddr1Balance).to.equal("6");
        });

        it('SafeBatchTransferFrom: should minted 5 of 1st tokens to addr1', async () => {
            await token.connect(owner)
                .mintBatch(
                    addr1.address,
                    [1, 3],
                    [5, 6],
                    []
                );
            await token.connect(addr1).safeBatchTransferFrom(addr1.address, owner.address, [1, 3],
                [5, 6],
                []);
            const firstAddr1Balance = await token.balanceOf(addr1.address, 1);
            expect(firstAddr1Balance).to.equal("0");
            const secondAddr1Balance = await token.balanceOf(addr1.address, 3);
            expect(secondAddr1Balance).to.equal("0");
            const firstOwnerBalance = await token.balanceOf(owner.address, 1);
            expect(firstOwnerBalance).to.equal("5");
            const secondOwnerBalance = await token.balanceOf(owner.address, 3);
            expect(secondOwnerBalance).to.equal("6");
        });

        it('SafeTransferFrom: should minted 5 of 1st tokens to addr1', async () => {
            await token.connect(owner)
                .mintBatch(
                    addr1.address,
                    [1, 3],
                    [5, 6],
                    []
                );
            await token.connect(addr1).safeTransferFrom(addr1.address, owner.address, 1,
                3,
                []);
            const firstAddr1Balance = await token.balanceOf(addr1.address, 1);
            expect(firstAddr1Balance).to.equal("2");
            const firstOwnerBalance = await token.balanceOf(owner.address, 1);
            expect(firstOwnerBalance).to.equal("3");
        
        });

   
    });
});

