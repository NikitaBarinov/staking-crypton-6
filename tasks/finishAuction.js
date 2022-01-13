task("finishAuction", "Finish auction")
.addParam("auctionId", "Id of auction")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .finishAuction(
                      taskArgs.auctionId
                    );
    
  console.log('Transaction hash:',result.hash);
});
