task("makeBid", "Make bid on auction")
.addParam("auctionId", "Id of auction")
.addParam("newPrice", "New price for auction")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .listItemOnAuction(
                      taskArgs.auctionId,
                      taskArgs.makeBid,
                    );
    
  console.log('Transaction hash:',result.hash);
});
