task("createItem", "Create item")
.addParam("address", "Address receiver")
.addParam("tokeURI", "URI of token")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .createItem(
                      taskArgs.address,
                      taskArgs.tokenURI
                    );
    
  console.log('Transaction hash:',result.hash);
});
  