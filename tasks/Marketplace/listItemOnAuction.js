task("listItemOnAuction", "List item on auction")
.addParam("itemId", "Id of listed item")
.addParam("minBidStep", "Min step of bid")
.addParam("startPrice", "Price for starting auction")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .listItemOnAuction(
                      taskArgs.itemId,
                      taskArgs.minBidStep,
                      taskArgs.startPrice
                    );
    
  console.log('Transaction hash:',result.hash);
});
