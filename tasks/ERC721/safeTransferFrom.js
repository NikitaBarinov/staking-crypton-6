const fs = require('fs');
const dotenv = require('dotenv');

task("safeTransferFrom", "Transfer token")
.addParam("tokenId", "Id of transferable token")
.setAction(async (taskArgs) => {
  const network = hre.network.name;
  const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
  for (const parameter in envConfig) {
    process.env[parameter] = envConfig[parameter];
  }
  const [first, second] = await hre.ethers.getSigners();
 
  const tradingFloor = await hre.ethers.getContractAt("ACDM721", process.env.ERC721_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .transferFrom(
                      second.address,
                      process.env.BRIDGE_ADDRESS,
                      taskArgs.tokenId
                    );
    
  console.log('Transaction hash:',result.hash);
});
