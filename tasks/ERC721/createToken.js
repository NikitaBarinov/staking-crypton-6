const fs = require('fs');
const dotenv = require('dotenv');
task("createToken", "Create token")
.addParam("address", "Address receiver")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();
 const ramsesURI = "";
 const network = hre.network.name;
 const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
 for (const parameter in envConfig) {
   process.env[parameter] = envConfig[parameter];
 }
  const tradingFloor = await hre.ethers.getContractAt("ACDM721", process.env.ERC721_ADDRESS);

  const result = await tradingFloor.connect(second)
                    .createToken(
                      taskArgs.address,
                      ramsesURI
                    );
    
  console.log('Transaction hash:',result.hash);
});
