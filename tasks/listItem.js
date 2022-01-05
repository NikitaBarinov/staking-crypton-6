task("listItem", "List item")
.addParam("itemId", "Id of listed item")
.addParam("price", "Price")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .listItem(
                      taskArgs.itemId,
                      taskArgs.price
                    );
    
  console.log('Transaction hash:',result.hash);
});
  