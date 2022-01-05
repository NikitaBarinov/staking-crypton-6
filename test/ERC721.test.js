const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");

describe('ERC721 contract', () => {
    let Token, token, owner, addr1, addr2;

    const zero_address = "0x0000000000000000000000000000000000000000";
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const ramsesURI = (testData.metadata).toString();
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("MonkeyVision");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy();
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
            expect(await token.owner()).to.equal(owner.address);
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

        it('Mint: should revert with "Ownable: caller is not the owner"', async () => {
            await expect(token.connect(addr1).createToken(addr1.address, ramsesURI))
            .to
            .be
            .revertedWith('Ownable: caller is not the owner');
        });
    });
});







