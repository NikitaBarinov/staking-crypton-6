const fs = require('fs');
const dotenv = require('dotenv');

task("swap", "swap item")
.addParam("tokenId", "Id of token")
.addParam("chainTo", "Chain id of network receiver")
.addParam("nonce", "Nonce")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();
const network = hre.network.name;
const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
for (const parameter in envConfig) {
  process.env[parameter] = envConfig[parameter];
}
  const tradingFloor = await hre.ethers.getContractAt("Bridge", process.env.BRIDGE_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .swap(
                      taskArgs.tokenId,
                      taskArgs.chainTo,
                      taskArgs.nonce
                    );
    
  console.log('Transaction hash:',result.hash);
});
