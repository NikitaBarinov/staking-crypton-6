const testData  = require("./nft/nft-metadata.json");

const testData1  = require("./nft/third.json");
const testData2  = require("./nft/pojiloy.json");
task("createItem", "Create item")
.addParam("address", "Address receiver")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();
 //const ramsesURI = (testData.metadata).toString();
 const ramsesURI = (testData2.metadata).toString();
 
  const tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.NFTMARKET_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .createItem(
                      taskArgs.address,
                      ramsesURI
                    );
    
  console.log('Transaction hash:',result.hash);
});
  