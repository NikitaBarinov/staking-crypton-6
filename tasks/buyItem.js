task("buyItem", "List item")
.addParam("itemId", "Id of listed item")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .buyItem(
                      taskArgs.itemId,
                    );
    
  console.log('Transaction hash:',result.hash);
});
  