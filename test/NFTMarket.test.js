const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");

describe('NFTMarket contract', () => {
    let Token, token, MonkeyVis, mv, Market, market, owner, addr1, addr2;
    const adminRole = ethers.constants.HashZero;
   
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const burnerRole =ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    const zero_address = "0x0000000000000000000000000000000000000000";
    const ramsesURI = (testData.metadata).toString();

    
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM");
        MonkeyVis = await ethers.getContractFactory("MonkeyVision");
        Market = await ethers.getContractFactory("NFTMarket");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy();
        await token.deployed();

        mv = await MonkeyVis.connect(owner).deploy();
        await mv.deployed();

        market = await Market.connect(owner).deploy(mv.address, token.address);
        await market.deployed();

        await mv.connect(owner).initMarket(market.address);
        
        await token.grantRole(minterRole, owner.address);
        await token.grantRole(burnerRole, owner.address);

        await token.connect(owner).mint(owner.address, 1000);
        await token.connect(owner).mint(addr1.address, 1000);
        await token.connect(owner).mint(market.address, 1000);
    });

    describe('Deployment', () => {
        it('Should set market as nft owner', async () => {
            expect(await mv.owner()).to.equal(market.address);
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
                await token.balanceOf(market.address))
            .to.equal(1000);  
            expect(
                await token.balanceOf(owner.address))
            .to.equal(1000); 
            expect(
                await token.balanceOf(addr1.address))
            .to.equal(1000);      
        });

        it("Non owner should not be able to init Marketplace", async () => {
            await expect(
                mv.connect(addr1).initMarket(market.address)
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe('Transactions', () => {
        it('Pausable: should pause and unpause contract', async () => {
            await market.pause();
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await expect(market
                .createItem(
                    owner.address,
                    ramsesURI
                )).to.be.revertedWith('Pausable: paused');
            
            await market.unpause();
            
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            itemInfo = await market.getItem(1);
            expect(itemInfo.owner).to.equal(owner.address);
        });

        it('Pausable: should be reverted with "Ownable: caller is not the owner"', async () => {
            await expect(market.connect(addr1).pause())
            .to.be.revertedWith('Ownable: caller is not the owner'); 
        });

        it('createItem: should create item', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            itemInfo = await market.getItem(1);
        
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sold).to.equal(false);
        });

        it('createItem: should reverted with "Ownable: caller is not the owner"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
        
            await expect(market.connect(addr1)
            .createItem(
                owner.address,
                ramsesURI
            ))
            .to.be.revertedWith('Ownable: caller is not the owner');
        });

        it('createItem: should emit "ItemCreated"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
        
            await expect(market
            .createItem(
                owner.address,
                ramsesURI
            ))
            .to.emit(market, "ItemCreated")
            .withArgs(owner.address, 1)
            .and.to.emit(mv, "TokenCreated")
            .withArgs(owner.address, 1, ramsesURI);
        });

        it('lisItem: should list item', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
                );

            itemInfo = await market.getItem(1);
        
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(100);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sold).to.equal(false);
        });

        it('lisItem: should reverted with "Not token owner"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
            );
            await expect(market.connect(addr1)
                .listItem(
                    1,
                    100
                ))
            .to.be.revertedWith('Not token owner');
        });

        it('lisItem: should reverted with "Item does not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
            );
            await expect(market
                .listItem(
                    100,
                    100
                ))
            .to.be.revertedWith('Item does not exist');
        });

        it('lisItem: should reverted with "Price must be bigger then zero"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
            );
            await expect(market
                .listItem(
                    1,
                    0
                ))
            .to.be.revertedWith('Price must be bigger then zero');
        });

        it('listItem: should emit "MarketItemCreated" and "Transfer"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
            .createItem(
                owner.address,
                ramsesURI
            );
            await expect(market
                .listItem(
                    1,
                    100
                )
            )
            .to.emit(market, "MarketItemCreated")
            .withArgs(mv.address, owner.address, market.address, 1, 100, false)
            .and.to.emit(mv, "Transfer")
            .withArgs(owner.address, market.address, 1);
        });

        it('buyItem: should buy item', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            token.connect(addr1).approve(market.address, 100);

            await market.connect(addr1)
            .buyItem(
                1
            );

            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(addr1.address);
            expect(itemInfo.sold).to.equal(true);
        });

        it('buyItem: should reverted with "Insufficent funds"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            await expect(market.connect(addr2)
                .buyItem(
                    1
                ))
            .to.be.revertedWith('Insufficent funds');
        });

        it('buyItem: should reverted with "Can not buy by himself"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );
            token.connect(owner).approve(market.address, 900);
            await expect(market.connect(owner)
                .buyItem(
                    1
                ))
            .to.be.revertedWith('Can not buy by himself');
        });

        it('buyItem: should emit "ItemBought"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            token.connect(addr1).approve(market.address, 900);

            await expect(market.connect(addr1)
                .buyItem(
                    1
                ))
            .to.emit(market, "ItemBought")
            .withArgs(addr1.address, 1, 100)
            .and.to.emit(token, "Transfer")
            .withArgs(addr1.address, owner.address, 100)
            .and.to.emit(mv, "Transfer")
            .withArgs(market.address, addr1.address, 1);
        });

        it('cancel: should cancel sales item', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            await market.connect(owner)
            .cancel(
                1
            );

            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sold).to.equal(false);
        });

        it('cancel: should reverted with "You are not item owner"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            await expect(market.connect(addr1)
                .cancel(
                    1
                ))
            .to.be.revertedWith('You are not item owner');
        });

        it('cancel: should reverted with "Item not sale"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await expect(market.connect(owner)
                .cancel(
                    1
                ))
            .to.be.revertedWith('Item not sale');
        });

        it('cancel: should emit "MarketItemCanceled"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market
                .listItem(
                    1,
                    100
            );

            await expect(market.connect(owner)
                .cancel(
                    1
                ))
            .to.emit(market, "MarketItemCanceled")
            .withArgs(1)
            .and.to.emit(mv, "Transfer")
            .withArgs(market.address, owner.address, 1);
        });
    });

    describe('View functions', () => {
        beforeEach(async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
        
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    addr1.address,
                    ramsesURI
                );

            await market
                .createItem(
                    addr1.address,
                    ramsesURI
                );

            await market
                .listItem(
                    1,
                    100
            );
            await mv.connect(addr1).setApprovalForAll(market.address, true);
            await market.connect(addr1)
                .listItem(
                    3,
                    120
            );
        });

        it('fetchMarketItems: should get all market items', async () => {
            const marketItems = await market.fetchMarketItems();
            itemInfo1 = await market.getItem(1);
            itemInfo3 = await market.getItem(3);

            expect(Number(marketItems[0].price)).to.equal(Number(itemInfo1.price));
            expect(Number(marketItems[1].price)).to.equal(Number(itemInfo3.price));
        });

        it('getItem: should get item information', async () => {
            itemInfo = await market.getItem(1);
    
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(100);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sold).to.equal(false);
        });

        
    });
});







