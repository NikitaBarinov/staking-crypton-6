const fs = require('fs');
const dotenv = require('dotenv');

task("redeem", "redeem token")
.addParam("tokenId", "Id of token")
.setAction(async (taskArgs) => {
  const network = hre.network.name;
  const envConfig = dotenv.parse(fs.readFileSync(`.env-${network}`));
  for (const parameter in envConfig) {
    process.env[parameter] = envConfig[parameter];
  }
  const [first, second] = await hre.ethers.getSigners();
  const types = [
    'address', 'uint256', 'uint256', 'uint256', 'uint256',
  ];

  const values = [
    second.address, taskArgs.tokenId, 42, 97, 1
  ];

  const hash = ethers.utils.solidityKeccak256(types, values);
  const sign = await second.signMessage(ethers.utils.arrayify(hash));
  const { v, r, s } = ethers.utils.splitSignature(sign);

    const tradingFloor = await hre.ethers.getContractAt("Bridge", process.env.BRIDGE_ADDRESS);

    const result = await tradingFloor.connect(second)
                      .redeem(
                        hash,
                        taskArgs.tokenId,
                        4,
                        1,
                        v,
                        r,
                        s
                      
                      );
      
    console.log('Transaction hash:',result.hash);
});
