task("changeAuctionTime", "Change time for auction")
.addParam("newAuctionTime", "New time for auctions auction")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .changeAuctionTime(
                      taskArgs.newAuctionTime
                    );
    
  console.log('Transaction hash:',result.hash);
});
