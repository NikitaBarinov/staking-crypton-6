task("cancel", "Create item")
.addParam("tokeId", "Id of token")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .cancel(
                      taskArgs.tokenId
                    );
    
  console.log('Transaction hash:',result.hash);
});
  