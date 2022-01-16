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
    const testData = "https://gateway.pinata.cloud/ipfs/uri/{id}.json";
    const adminRole: string = ethers.constants.HashZero;
    const minterRole: string = ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const burnerRole: string = ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    const zero_address: string = "0x0000000000000000000000000000000000000000";
    const ramsesURI: string = testData;
    
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM1155");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy(ramsesURI );
        await token.deployed();
    });

    describe('Deployment', () => {
        it('Should set admin role for owner', async () => {
            expect(await token.hasRole(adminRole, owner.address)).to.equal(true);
        });

        it('Should set minter role for owner', async () => {
            expect(await token.hasRole(minterRole, owner.address)).to.equal(true);
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

        it('Mint: should fail not owner can mint tokens', async () => {
            await expect(token.connect(addr1)
                .mintBatch(
                addr1.address,
                [1, 3],
                [5, 6],
                []
                ))
                .to
                .be
                .revertedWith(`AccessControl: account ${addr1.address.toLowerCase()} is missing role ${minterRole}`);
        });
        // it('Transfer: should transfer tokens to addr1', async () => {
        //     await token.connect(owner).transfer(addr1.address, 1);

        //     const ownerBalance = await token.balanceOf(owner.address);
        //     const addr1Balance = await token.balanceOf(addr1.address);

        //     expect(ownerBalance).to.equal("999");
        //     expect(addr1Balance).to.equal("1001");
        // });

        // it("Transfer: should emit Transfer event", async () => {
        //     await expect(token.connect(owner).transfer(addr1.address, 1))
        //         .to.emit(token, "Transfer")
        //         .withArgs(owner.address, addr1.address, 1);
        // });

        // it('Transfer: should reverted with "ERC20: transfer amount exceeds balance"', async () => {
        //     await expect(token.connect(addr2).transfer(owner.address, 2))
        //         .to
        //         .be
        //         .revertedWith('ERC20: transfer amount exceeds balance');

        //     const ownerBalance = await token.balanceOf(owner.address);
        //     const addr1Balance = await token.balanceOf(addr1.address);

        //     expect(ownerBalance).to.equal("1000");
        //     expect(addr1Balance).to.equal("1000");
        // });
    });
});

