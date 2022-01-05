const testData  = require("./nft-metadata.json");

task("createItem", "Create item")
.addParam("address", "Address receiver")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();
 const ramsesURI = (testData.metadata).toString();
  const tradingFloor = await hre.ethers.getContractAt("MonkeyVision", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .createItem(
                      taskArgs.address,
                      ramsesURI
                    );
    
  console.log('Transaction hash:',result.hash);
});
  