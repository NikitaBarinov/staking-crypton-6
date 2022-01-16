const { expect } = require("chai");
const { ethers } = require("hardhat");
const testData  = require("./fixtures/nft-metadata.json");

describe('NFTMarket contract', () => {
    let Token, token, MonkeyVis, mv, Market, market, owner, addr1, addr2;
    const adminRole = ethers.constants.HashZero;
   
    const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
    const burnerRole =ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    const pauserRole =ethers.utils.solidityKeccak256(["string"],["PAUSER_ROLE"]);
    const zero_address = "0x0000000000000000000000000000000000000000";
    const ramsesURI = (testData.metadata).toString();

    
    before(async () => {
        [addr1, owner, addr2] = await ethers.getSigners();
        Token = await ethers.getContractFactory("ACDM");
        MonkeyVis = await ethers.getContractFactory("MonkeyVision");
        ERC1155Token = await ethers.getContractFactory("ACDM1155"); 
        Market = await ethers.getContractFactory("NFTMarket");
    });
    
    beforeEach(async () => {
        token = await Token.connect(owner).deploy();
        await token.deployed();

        mv = await MonkeyVis.connect(owner).deploy();
        await mv.deployed();

        erc1155Token = await ERC1155Token.connect(owner).deploy(testData.metadata.toString());
        await erc1155Token.deployed();

        market = await Market.connect(owner).deploy(mv.address, token.address, erc1155Token.address);
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

        it('Should set admin role for owner', async () => {
            expect(await market.hasRole(adminRole, owner.address)).to.equal(true);
        });

        it('Should set minter role for owner', async () => {
            expect(await market.hasRole(minterRole, owner.address)).to.equal(true);
        });

        it('Should set pauser role for owner', async () => {
            expect(await market.hasRole(pauserRole, owner.address)).to.equal(true);
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
            expect(itemInfo.sale).to.equal(false);
        });

        it('createItem: should emit "ItemCreated"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
        
            await expect(market
            .createItem(
                owner.address,
                ramsesURI
            ))
            .to.emit(market, "ItemCreated")
            .withArgs(owner.address, 1, 1)
            .and.to.emit(mv, "TokenCreated")
            .withArgs(owner.address, 1, ramsesURI);
        });

        it('listItem: should list item', async () => {
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
            expect(itemInfo.sale).to.equal(true);
        });

        it('listItem: should reverted with "Not token owner"', async () => {
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

        it('listItem: should reverted with "Not token owner"', async () => {
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
            .to.be.revertedWith('Not token owner');
        });

        it('listItem: should reverted with "Price must be bigger then zero"', async () => {
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
            .withArgs(mv.address, owner.address, 1, 100, true)
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
            expect(itemInfo.sale).to.equal(false);
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

        it('buyItem: can not buy listed on auction item', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );


            token.connect(addr1).approve(market.address, 900);
            await market.connect(addr1).makeBid(1,6);
            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sale).to.equal(true);

            await expect(market.connect(addr2)
                .buyItem(
                    1
                ))
            .to.be.revertedWith('Insufficent funds');

            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sale).to.equal(true);

            auctionInfo = await market.getAuction(1);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(addr1.address);
            expect(Number(auctionInfo.price)).to.equal(6);
            expect(Number(auctionInfo.amountOfBids)).to.equal(1);
            expect(auctionInfo.idItem).to.equal(1);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(true);
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
            expect(itemInfo.sale).to.equal(false);
        });

        it('cancel: should reverted with "Not token owner"', async () => {
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
            .to.be.revertedWith('Not token owner');
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

        it('listItemOnAuction: should buy list item on auction', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            auctionInfo = await market.getAuction(1);
            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sale).to.equal(true);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(zero_address);
            expect(Number(auctionInfo.price)).to.equal(5);
            expect(Number(auctionInfo.amountOfBids)).to.equal(0);
            expect(auctionInfo.amountOfBids).to.equal(0);
            expect(auctionInfo.idItem).to.equal(1);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(true);
        });

        it('listItemOnAuction: to be revet with "Not token owner"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await expect(market.connect(addr1)
            .listItemOnAuction(
                1,
                1,
                5 
            ))
            .to.be.revertedWith('Not token owner');
        });

        
        it('listItemOnAuction: can not list listed item on auction', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
            .listItemOnAuction(
                1,
                1,
                5 
            );
            await expect(market
                .listItem(
                    1,
                    100
                ))
            .to.be.revertedWith('Item sale');
        });

        it('listItemOnAuction: to be revet with "Item sale"', async () => {
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
            .listItemOnAuction(
                1,
                1,
                5 
            ))
            .to.be.revertedWith('Item sale');
        });

        it('listItemOnAuction: to emit "AuctionStarted"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await expect(market.connect(owner)
            .listItemOnAuction(
                5,
                1,
                5 
            ))
            .to.be.revertedWith('Not token owner');
            await expect(
                market
                .connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
                ))
            .to.emit(market, "AuctionStarted")
            .withArgs(owner.address, 5, 1, Number((await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp + (259201)), 1, 1)
            .and.to.emit(mv, "Transfer")
            .withArgs(owner.address, market.address, 1);
        });

        it('makeBid: should make a bid to auction', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );


            token.connect(addr1).approve(market.address, 900);
            await market.connect(addr1).makeBid(1,6);

            auctionInfo = await market.getAuction(1);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(addr1.address);
            expect(Number(auctionInfo.price)).to.equal(6);
            expect(Number(auctionInfo.amountOfBids)).to.equal(1);
            expect(auctionInfo.idItem).to.equal(1);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(true);
        });

        it('makeBid: should revert with "Can not make bid"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            await expect(market.connect(owner).makeBid(1,6))
                .to.be.revertedWith('Can not make bid');
        });

        it('makeBid: should revert with "Insufficent funds"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );
            
            token.connect(addr1).approve(market.address, 900);
                
            await expect(market.connect(addr1).makeBid(1,5))
                .to.be.revertedWith('Insufficent funds');
        });

        it('makeBid: should revert with "Insufficent funds"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );
                
            await expect(market.connect(addr2).makeBid(1,6))
                .to.be.revertedWith('Insufficent funds');
        });
        
        it('makeBid: should revert with "Auction not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");
            
            await market.connect(owner)
                .finishAuction(
                    1,
            );
        
            await expect(market.connect(owner).makeBid(1,9))
                .to.be.revertedWith('Auction not exist');
        });

        it('makeBid: should revert with "Can not make bid"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await expect(market.connect(addr1).makeBid(1,9))
                .to.be.revertedWith('Can not make bid');
        });

        it('makeBid: should revert with "Auction not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);

            await expect(market.connect(addr1).makeBid(5,9))
                .to.be.revertedWith('Auction not exist');
        });

        it('makeBid: should emit "BidMaked"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );

            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );
            
            token.connect(addr1).approve(market.address, 900);
                
            await expect(market.connect(addr1).makeBid(1,6))
            .to.emit(market, "BidMaked")
            .withArgs(addr1.address, 6, 1, 1);
        });

        it('finishAuction: should finish auction', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");
            
            await market.connect(owner)
                .finishAuction(
                    1,
            );

            auctionInfo = await market.getAuction(1);
            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(addr1.address);
            expect(itemInfo.sale).to.equal(false);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(addr1.address);
            expect(Number(auctionInfo.price)).to.equal(8);
            expect(Number(auctionInfo.amountOfBids)).to.equal(3);
            expect(auctionInfo.idItem).to.equal(1);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(false);
        });

        it('finishAuction: should revert with "Auction not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");
            
            await market.connect(owner)
                .finishAuction(
                    1,
            );

            
            await expect(market.connect(owner)
            .finishAuction(
                1,
                ))
                .to.be.revertedWith('Auction not exist');
        });

        it('finishAuction: should revert with "Can not finish auction"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);
            
            await expect(market.connect(owner)
            .finishAuction(
                1,
                ))
                .to.be.revertedWith('Can not finish auction');
        });

        it('finishAuction: should revert with "Auction not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);
            
            await expect(market.connect(owner)
            .finishAuction(
                5,
                ))
                .to.be.revertedWith('Auction not exist');
        });

        it('finishAuction: should revert with "Insufficent bids"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            
            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await expect(market.connect(owner)
            .finishAuction(
                1,
                ))
                .to.be.revertedWith('Insufficent bids');
        });

        it('finishAuction: should emit "AuctionFinished"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await expect(market.connect(owner)
            .finishAuction(
                1,
            ))
            .to.emit(market, "AuctionFinished")
            .withArgs(addr1.address, 1, true);
        });

        it('cancelAuction: should cancel auction', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await market.connect(owner)
                .cancelAuction(
                    1,
            );

            auctionInfo = await market.getAuction(1);
            itemInfo = await market.getItem(1);
                
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(0);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sale).to.equal(false);
            
            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(addr1.address);
            expect(Number(auctionInfo.price)).to.equal(6);
            expect(Number(auctionInfo.amountOfBids)).to.equal(1);
            expect(auctionInfo.idItem).to.equal(1);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(false);
        });

        it('cancelAuction: should revert with "Too many bids"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);
            await market.connect(addr1).makeBid(1,7);
            await market.connect(addr1).makeBid(1,8);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await expect(market.connect(owner)
            .cancelAuction(
                1,
                ))
                .to.be.revertedWith('Too many bids');
        });

        it('cancelAuction: should revert with "Can not finish auction"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);

            await expect(market.connect(addr1)
            .cancelAuction(
                1,
                ))
                .to.be.revertedWith('Can not finish auction');
        });

        it('cancelAuction: should revert with "Can not finish auction"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);

            await expect(market.connect(owner)
            .cancelAuction(
                1,
                ))
                .to.be.revertedWith("Can not finish auction");
        });

        it('cancelAuction: should emit "AuctionFinished"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    1,
                    1,
                    5 
            );

            token.connect(addr1).approve(market.address, 900);
         
            await market.connect(addr1).makeBid(1,6);

            await network.provider.send("evm_increaseTime", [259202])
            await network.provider.send("evm_mine");

            await expect(market.connect(owner)
            .cancelAuction(
                1,
                ))
                .to.emit(market, "AuctionFinished")
                .withArgs(owner.address, 1, false);
        });

        it('changeAuctionTime: should change auction time and emit "AuctionTimeChanged"', async () => {
            await expect(market.connect(owner).changeAuctionTime(Number(24 * 2 * 3600))
            )
            .to.emit(market, "AuctionTimeChanged")
            .withArgs(172800);
        });

        it('changeAuctionTime: should revert with "Time must be between 1st and 5th days"', async () => {
            await expect(market.connect(owner).changeAuctionTime(Number(3600))
            )
            .to.be.revertedWith("Time must be between 1st and 5th days");
        });

        it('changeAuctionTime: should revert with "Time must be between 1st and 5th days"', async () => {
            await expect(market.connect(owner).changeAuctionTime(Number(24 * 6 * 3600))
            )
            .to.be.revertedWith("Time must be between 1st and 5th days");
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
                .createItem(
                    owner.address,
                    ramsesURI
                );

            await market
                .createItem(
                    owner.address,
                    ramsesURI
                )

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

        it('fetchAuctionItems: should get all auction items', async () => {
            await market.connect(owner)
                .listItemOnAuction(
                    4,
                    1,
                    5 
            );
            await market.connect(owner)
                .listItemOnAuction(
                    5,
                    1,
                    5 
            );

            const marketItems = await market.fetchAuctionItems();
            itemInfo1 = await market.getItem(4);
            itemInfo3 = await market.getItem(5);

            expect(Number(marketItems[0].price)).to.equal(0);
            expect(Number(marketItems[1].price)).to.equal(0);
            expect(marketItems[0].sale).to.equal(true);
            expect(marketItems[1].sale).to.equal(true);
        });

        it('getItem: should get item information', async () => {
            itemInfo = await market.getItem(1);
    
            expect(Number(itemInfo.itemId)).to.equal(1);
            expect(Number(itemInfo.price)).to.equal(100);
            expect(itemInfo.nftContract).to.equal(mv.address);
            expect(itemInfo.owner).to.equal(owner.address);
            expect(itemInfo.sale).to.equal(true);
        });

        it('getAuction: should get auction information', async () => {
            await market.connect(owner)
            .listItemOnAuction(
                5,
                1,
                5 
            );
            auctionInfo = await market.getAuction(1);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(zero_address);
            expect(Number(auctionInfo.price)).to.equal(5);
            expect(Number(auctionInfo.amountOfBids)).to.equal(0);
            expect(auctionInfo.amountOfBids).to.equal(0);
            expect(auctionInfo.idItem).to.equal(5);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(true);
        });
    });
});







