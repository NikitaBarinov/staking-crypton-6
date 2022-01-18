const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");

describe('Bridge contract', () => {
    let Token, token1, token2, bridge1, bridge2, Bridge,Bridge2, owner, addr1, addr2;
    const zero_address = "0x0000000000000000000000000000000000000000";
    const ramsesURI = (testData.metadata).toString();

    const chainId1 = 1;
    const chainId2 = 2;
    const types = [
        'address', 'uint256', 'uint256', 'uint256', 'uint256',
      ];

      const values = [
        owner.address, tokenId, chainId, chainId, nonce
      ];

      const hash = ethers.utils.solidityKeccak256(types, values);
      const sign = await validatorWallet.signMessage(ethers.utils.arrayify(hash));
      const { v, r, s } = ethers.utils.splitSignature(sign);

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

        token1.connect(owner).createToken(owner.address,ramsesURI);
        token1.connect(owner).createToken(addr1.address,ramsesURI);

        token2.connect(owner).createToken(owner.address,ramsesURI);
        token2.connect(owner).createToken(addr1.address,ramsesURI);
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token1.name()).to.equal("Metaverse Token");
            expect(await token2.name()).to.equal("Metaverse Token");
        });

        it('Should set right symbol', async () => {
            expect(await token1.symbol()).to.equal("MET");
            expect(await token2.symbol()).to.equal("MET");
        }); 

        it('Should set right owner for tokens', async () => {
            expect(await token1.owner()).to.equal(owner.address);
            expect(await token2.owner()).to.equal(owner.address);
        });

        it('Should set right balance for owner address and addr1 address', async () => {
            expect(await token1.balanceOf(owner.address)).to.equal(1);
            expect(await token2.balanceOf(owner.address)).to.equal(1);
            expect(await token1.balanceOf(addr1.address)).to.equal(1);
            expect(await token2.balanceOf(addr1.address)).to.equal(1);         
        });
    });

    describe('Transactions', () => {
        it('swap: should swap tokens between ', async () => {
            await token1.connect(owner).setApprovalForAll(bridge1.address, true);
            await expect(bridge1.connect(owner).swap(1, chainId1, 2))
            .to.emit(bridge1, "SwapInitialized")
            .withArgs(owner.address, 1, 31337, chainId1, 2);
        });
    });
});
