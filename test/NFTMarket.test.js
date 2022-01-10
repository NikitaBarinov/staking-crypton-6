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
            expect(itemInfo.sale).to.equal(false);
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

        it('listItem: should reverted with "Item does not exist"', async () => {
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

        it('listItemOnAuction: to be revet with "Item already sale"', async () => {
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
            .to.be.revertedWith('Item already sale');
        });

        it('listItemOnAuction: to be revet with "Item does not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await expect(market
            .listItemOnAuction(
                5,
                1,
                5 
            ))
            .to.be.revertedWith('Item does not exist');
        });

        it('listItemOnAuction: to emit "Item does not exist"', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await expect(market
            .listItemOnAuction(
                5,
                1,
                5 
            ))
            .to.be.revertedWith('Item does not exist');
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
        
        it('makeBid: should revert with "Auction closed"', async () => {
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
        
            await expect(market.connect(addr1).makeBid(1,9))
                .to.be.revertedWith('Auction closed');
        });

        it('makeBid: should revert with "Time is over"', async () => {
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
                .to.be.revertedWith('Time is over');
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

        it('finishAuction: should revert with "Auction closed"', async () => {
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
                .to.be.revertedWith('Auction closed');
        });

        it('finishAuction: should revert with "Time is not over"', async () => {
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
                .to.be.revertedWith('Time is not over');
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
            .withArgs(1, true);
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

        it('cancelAuction: should revert with "Not item owner"', async () => {
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
                .to.be.revertedWith('Not item owner');
        });

        it('cancelAuction: should revert with "Time is not over"', async () => {
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
                .to.be.revertedWith("Time is not over");
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
                .withArgs(1, false);
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
            expect(itemInfo.sale).to.equal(true);
        });

        it('getItem: should get item information', async () => {
            await mv.connect(owner).setApprovalForAll(market.address, true);
            await market
                .createItem(
                    owner.address,
                    ramsesURI
                );
            
            await market.connect(owner)
                .listItemOnAuction(
                    4,
                    1,
                    5 
            );

            auctionInfo = await market.getAuction(1);

            expect(auctionInfo.owner).to.equal(owner.address);
            expect(auctionInfo.lastBidder).to.equal(zero_address);
            expect(Number(auctionInfo.price)).to.equal(5);
            expect(Number(auctionInfo.amountOfBids)).to.equal(0);
            expect(auctionInfo.amountOfBids).to.equal(0);
            expect(auctionInfo.idItem).to.equal(4);
            expect(auctionInfo.minBidStep).to.equal(1);
            expect(auctionInfo.open).to.equal(true);
        });
    });
});







