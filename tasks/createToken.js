const testData  = require("./nft/nft-metadata.json");

task("createToken", "Create token")
.addParam("address", "Address receiver")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();
 const ramsesURI = (testData.metadata).toString();
 
  const tradingFloor = await hre.ethers.getContractAt("ACDM721", process.env.ERC721_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .createToken(
                      taskArgs.address,
                      ramsesURI
                    );
    
  console.log('Transaction hash:',result.hash);
});
