const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");

describe('ERC1155 contract', () => {
    let Token, token, owner, addr1, addr2;
    
    const adminRole = ethers.constants.HashZero;
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const burnerRole =ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    const zero_address = "0x0000000000000000000000000000000000000000";
    const ramsesURI = (testData.metadata).toString();
    
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

        it('Should set burner role for owner', async () => {
            expect(await token.hasRole(burnerRole, owner.address)).to.equal(true);
        });   
    });
    
    describe('Transactions', () => {
        it('Mint: should minted 5 of 1st tokens to addr1', async () => {
            await token.connect(owner)
                .mint(
                    addr1.address,
                    1,
                    5,
                    ""
                );
            const finalAddr1Balance = await token.balanceOf(addr1.address);
            console.log(finalAddr1Balance);
            expect(finalAddr1Balance).to.equal("1005");
        });

        it('Mint: should fail not owner can mint tokens', async () => {
            await expect(token.connect(addr1).mint(
                addr2.address,
                5
            ))
                .to
                .be
                .revertedWith(`AccessControl: account ${addr1.address.toLowerCase()} is missing role ${minterRole}`);
            const finalAddr2Balance = await token.balanceOf(addr2.address);
            expect(finalAddr2Balance).to.equal("0");
        });
        it('Transfer: should transfer tokens to addr1', async () => {
            await token.connect(owner).transfer(addr1.address, 1);

            const ownerBalance = await token.balanceOf(owner.address);
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(ownerBalance).to.equal("999");
            expect(addr1Balance).to.equal("1001");
        });

        it("Transfer: should emit Transfer event", async () => {
            await expect(token.connect(owner).transfer(addr1.address, 1))
                .to.emit(token, "Transfer")
                .withArgs(owner.address, addr1.address, 1);
        });

        it('Transfer: should reverted with "ERC20: transfer amount exceeds balance"', async () => {
            await expect(token.connect(addr2).transfer(owner.address, 2))
                .to
                .be
                .revertedWith('ERC20: transfer amount exceeds balance');

            const ownerBalance = await token.balanceOf(owner.address);
            const addr1Balance = await token.balanceOf(addr1.address);

            expect(ownerBalance).to.equal("1000");
            expect(addr1Balance).to.equal("1000");
        });
    });
});

