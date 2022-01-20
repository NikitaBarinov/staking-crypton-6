const fs = require('fs');
const dotenv = require('dotenv');
task("erc721balanceOf", "To get balance of address")
.addParam("addressOf", "The account address")
.setAction(async (taskArgs) => {
    const network = hre.network.name;
    const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
    for (const parameter in envConfig) {
      process.env[parameter] = envConfig[parameter];
    }
    const token = await hre.ethers.getContractAt("ACDM721", process.env.ERC721_ADDRESS)

    const result = await token.balanceOf(taskArgs.addressOf);
    balance = result.toNumber();
        
    console.log('Balance:',balance); 
});
