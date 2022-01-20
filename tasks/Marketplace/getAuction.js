task("getAuction", "Get auction info")
.addParam("id", "Id of auction")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .getAuction(
                      taskArgs.id
                    );
    
  console.log('Result:',result);
});
  