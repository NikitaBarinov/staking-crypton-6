const { expect } = require("chai");
const { ethers } = require("hardhat");

describe('ERC20 contract', () => {
    let Token, token, MonkeyVis, mv, Market, market, owner, addr1, addr2;
    const adminRole = ethers.constants.HashZero;
   
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const burnerRole =ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    const zero_address = "0x0000000000000000000000000000000000000000";
    
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy();
        await token.deployed();
        
        await token.grantRole(minterRole, owner.address);
        await token.grantRole(burnerRole, owner.address);

        await token.connect(owner).mint(owner.address, 1000);
        await token.connect(owner).mint(addr1.address, 1000);
    });

    describe('Deployment', () => {
        it('Should set right name', async () => {
            expect(await token.name()).to.equal("ACDM");
        });

        it('Should set right symbol', async () => {
        expect(await token.symbol()).to.equal("ACD");
        }); 

        it('Should set right decimals', async () => {
            expect(await token.decimals()).to.equal(18);
        }); 

        it('Should set admin role for owner', async () => {
            expect(await token.hasRole(adminRole, owner.address)).to.equal(true);
        });

        it('Should set minter role for owner', async () => {
            expect(await token.hasRole(minterRole, owner.address)).to.equal(true);
        });

        it('Should set burner role for owner', async () => {
            expect(await token.hasRole(burnerRole, owner.address)).to.equal(true);
        });

        it('Should set right balance for floor address', async () => {  
            expect(
                await token.balanceOf(owner.address))
            .to.equal(1000); 
            expect(
                await token.balanceOf(addr1.address))
            .to.equal(1000);      
        });

        it('Should set right totalSupply', async () => {
          expect(await token.totalSupply()).to.equal(2000);
        });       
    });

    describe('Transactions', () => {
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

        it('Approve: should approve 10 tokens for addr1', async () => {
            await token.connect(owner).approve(addr1.address, 10);
            
            const addr1Allowance = await token
                .allowance(owner.address, addr1.address);

            expect(addr1Allowance).to.equal("10");
        });

        it("Approve: should emit Approval event", async () => {
            await expect(token.connect(owner).approve(addr1.address, 10))
                .to.emit(token, "Approval")
                .withArgs(owner.address, addr1.address, 10);
        });

        it('Approve: should transfer 5 tokens from addr1 to addr2', async () => {
            await token.connect(owner)
                .approve(
                    addr1.address,
                    10
                );

            await token.connect(addr1)
                .transferFrom(
                    owner.address,
                    addr2.address,
                    5
                );

            const addr1Allowance = await token
                .allowance(
                    owner.address,
                    addr1.address
                );

            const ownerBalance = await token.balanceOf(owner.address);
            const addr2Balance = await token.balanceOf(addr2.address);

            expect(ownerBalance).to.equal("995");
            expect(addr2Balance).to.equal("5");
            expect(addr1Allowance).to.equal("5");
        });

        it('Approve: should revert with "ERC20: transfer amount exceeds allowance"', async () => {
            await expect(token.connect(addr1).transferFrom(
                owner.address,
                addr2.address,
                5
            ))
                .to
                .be
                .revertedWith('ERC20: transfer amount exceeds allowance');

            const addr1Allowance = await token
                .allowance(
                    owner.address,
                    addr1.address
                );

            expect(addr1Allowance).to.equal("0");
        });

        it('Approve: should fail if senders balance is too low', async () => {
            await expect(token.connect(addr1).transferFrom(
                addr2.address,
                addr1.address,
                5
            ))
                .to
                .be
                .revertedWith('ERC20: transfer amount exceeds balance');

            const addr1Balance = await token
                .balanceOf(
                    addr1.address
                );

            expect(addr1Balance).to.equal("1000");
        });

        it('Mint: should minted 5 tokens to addr1', async () => {
            await token.connect(owner)
                .mint(
                    addr1.address,
                    5
                );
            const finalAddr1Balance = await token.balanceOf(addr1.address);
            const finalTotalSupply = await token.totalSupply();
            expect(finalAddr1Balance).to.equal("1005");
            expect(finalTotalSupply).to.equal("2005");
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
    });
});

