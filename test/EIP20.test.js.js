const { expect } = require("chai");
const { ethers } = require("hardhat");


// Token metadata
const tokenName = "ACDM";
const symbol = "ACD";
const decimals = 18;
const fiveTokens = ethers.utils.parseEther("5");

// AccessControl roles in bytes32 string
// DEFAULT_ADMIN_ROLE, MINTER_ROLE, BURNER_ROLE
const adminRole = ethers.constants.HashZero;
const minterRole = ethers.utils.solidityKeccak256(["string"], ["MINTER_ROLE"]);
const burnerRole = ethers.utils.solidityKeccak256(["string"], ["BURNER_ROLE"]);

describe("Token", function () {
    let Token, token, owner, addr1, addr2;

  before(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("ACDM");
  });

  beforeEach(async () => {
    token = await Token.deploy();
    await token.deployed();

    await token.grantRole(minterRole, owner.address);
    await token.grantRole(burnerRole, owner.address);
    
    const amount = ethers.utils.parseUnits("1000.0", decimals);
    await token.connect(owner).mint(owner.address, amount);
    await token.connect(owner).mint(addr2.address, amount);
  });

  describe("Deployment", function () {
    it("Has a name", async () => {
      expect(await token.name()).to.be.equal(tokenName);
    });

    it("Has a symbol", async () => {
      expect(await token.symbol()).to.be.equal(symbol);
    });

    it(`Has ${decimals} decimals`, async () => {
      expect(await token.decimals()).to.be.equal(decimals);
    });

    it("Should set the right admin role", async () => {
      expect(await token.hasRole(adminRole, owner.address)).to.equal(true);
    });

    it("Should set the right minter role", async () => {
      expect(await token.hasRole(minterRole, owner.address)).to.equal(true);
    });

    it("Should set the right burner role", async () => {
      expect(await token.hasRole(burnerRole, owner.address)).to.equal(true);
    });
  });

  describe("Ownership", function () {
    it("Only admin can grant roles", async () => {
      await expect(
        token.connect(addr1).grantRole(burnerRole, addr2.address)
      ).to.be.revertedWith(
        `AccessControl: account ${addr1.address.toLowerCase()} is missing role ${adminRole}`
      );
    });
  });

  describe("Transfer", function () {
    it("Should transfer tokens between accounts", async () => {
      const ownerInitBalance = await token.balanceOf(owner.address);
      const addr2InitBalance = await token.balanceOf(addr2.address);
      await token.transfer(addr2.address, fiveTokens);
      const addr2FinalBalance = await token.balanceOf(addr2.address);
      const ownerFinalBalance = await token.balanceOf(owner.address);
      expect(Number(addr2FinalBalance - addr2InitBalance)).to.equal(Number(ownerInitBalance - ownerFinalBalance));
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      await expect(
        token.connect(addr1).transfer(owner.address, fiveTokens)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance'");

      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.balanceOf(owner.address)).to.equal(ownerBalance);
    });

    it("Can not transfer above the amount", async () => {
      await expect(
        token.transfer(addr1.address, ethers.utils.parseUnits("1000.01", decimals))
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("Transfer should emit event", async () => {
      await expect(token.transfer(addr1.address, fiveTokens))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, addr1.address, fiveTokens);
    });

    it("Should update balances after transfers", async function () {
      const ownerInitBalance = await token.balanceOf(owner.address);
      const addr1InitBalance = await token.balanceOf(addr1.address);
      const addr2InitBalance = await token.balanceOf(addr2.address);

      await token.transfer(addr1.address, fiveTokens);
      await token.transfer(addr2.address, fiveTokens);

      const ownerFinalBalance = await token.balanceOf(owner.address);
      const addr1FinalBalance = await token.balanceOf(addr1.address);
      const addr2FinalBalance = await token.balanceOf(addr2.address);
     
      expect(Number(ownerFinalBalance - ownerInitBalance)).to.equal(Number(fiveTokens));
      expect(Number(addr1FinalBalance - addr1InitBalance)).to.equal(Number(fiveTokens));
      expect(Number(addr2FinalBalance - addr2InitBalance)).to.equal(Number(fiveTokens));
    });
  });

  describe("Allowance", function () {
    it("Approve should emit event", async () => {
      const amount = tenTokens;
      await expect(token.approve(alice.address, amount))
        .to.emit(token, "Approval")
        .withArgs(owner.address, alice.address, amount);
    });

    it("Allowance should change after token approve", async () => {
      await token.approve(alice.address, tenTokens);
      const allowance = await token.allowance(owner.address, alice.address);
      expect(allowance).to.be.equal(tenTokens);
    });

    it("TransferFrom should emit event", async () => {
      const amount = tenTokens;
      await token.approve(alice.address, amount);
      await expect(
        token.connect(alice).transferFrom(owner.address, alice.address, amount)
      )
        .to.emit(token, "Transfer")
        .withArgs(owner.address, alice.address, amount);
    });

    it("Can not TransferFrom above the approved amount", async () => {
      // Approve 10 tokens to Alice
      await token.approve(alice.address, tenTokens);
      // Trying to transfer 20 tokens
      await expect(
        token.connect(alice).transferFrom(owner.address, alice.address, twentyTokens)
      ).to.be.revertedWith("ERC20: transfer amount exceeds allowance");
    });

    it("Can not TransferFrom if owner does not have enough tokens", async () => {
      // Approve Alice to use 10 tokens
      await token.approve(alice.address, tenTokens);

      // Send most of owner tokens to Bob
      await token.transfer(bob.address, ethers.utils.parseUnits("995.0", decimals));

      // Check that Alice can't transfer all amount (only 5 left)
      await expect(
        token.connect(alice).transferFrom(owner.address, alice.address, tenTokens)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });
  });

  // In our tests Bob has the BURNER_ROLE
  describe("Burning", function () {
    it("Should not be able to burn tokens without BURNER_ROLE", async () => {
      const burnAmount = tenTokens;
      await expect(token.burn(alice.address, burnAmount)).to.be.revertedWith(
        `AccessControl: account ${owner.address.toLowerCase()} is missing role ${burnerRole}`
      );
    });

    it("Burner should be able to burn tokens", async () => {
      const burnAmount = tenTokens;
      await expect(token.connect(bob).burn(owner.address, burnAmount))
        .to.emit(token, "Transfer")
        .withArgs(owner.address, ethers.constants.AddressZero, burnAmount);
    });

    it("Token supply & balance should change after burning", async () => {
      const initialSupply = await token.totalSupply();
      const initialOwnerBalance = await token.balanceOf(owner.address);

      const burnAmount = tenTokens;
      await token.connect(bob).burn(owner.address, burnAmount);

      const currentSupply = await token.totalSupply();
      expect(currentSupply).to.equal(initialSupply.sub(burnAmount));

      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialOwnerBalance.sub(burnAmount));
    });

    it("Can not burn above total supply", async () => {
      const initialSupply = await token.totalSupply();
      await expect(
        token.connect(bob).burn(owner.address, initialSupply)
      ).to.be.revertedWith("ERC20: burn amount exceeds balance");
    });
  });

  // In out tests Alice has the MINTER_ROLE
  describe("Minting", function () {
    it("Should not be able to mint tokens without MINTER_ROLE", async () => {
      const mintAmount = tenTokens;
      await expect(token.mint(alice.address, mintAmount)).to.be.revertedWith(
        `AccessControl: account ${owner.address.toLowerCase()} is missing role ${minterRole}`
      );
    });

    it("Minter should be able to mint tokens", async () => {
      const mintAmount = tenTokens;
      await expect(token.connect(alice).mint(owner.address, mintAmount))
        .to.emit(token, "Transfer")
        .withArgs(ethers.constants.AddressZero, owner.address, mintAmount);
    });

    it("Token supply & balance should change after minting", async () => {
      const initialSupply = await token.totalSupply();
      const initialOwnerBalance = await token.balanceOf(owner.address);

      const mintAmount = tenTokens;
      await token.connect(alice).mint(owner.address, mintAmount);

      const currentSupply = await token.totalSupply();
      expect(currentSupply).to.equal(initialSupply.add(mintAmount));

      const ownerBalance = await token.balanceOf(owner.address);
      expect(ownerBalance).to.equal(initialOwnerBalance.add(mintAmount));
    });
  });
});