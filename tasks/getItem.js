task("getItem", "Get item info")
.addParam("id", "Id of closable order")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .getItem(
                      taskArgs.id
                    );
    
  console.log('Result:',result);
});
  