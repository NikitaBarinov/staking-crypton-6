task("fetchMarketItem", "Return market items")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .fetchMarketItems(
                    );
    
  console.log('Result:',result);
});
  