const fs = require('fs');

async function main() {
    const accounts = await ethers.getSigners();
    console.log('Deploying contract with account:',accounts[1].address);
    
    const balance = await accounts[1].getBalance();
    console.log('Account balance ',balance.toString());
    const token = await hre.ethers.getContractAt("ACDM", process.env.TOKEN_ADDRESS);
     
    const mv = await ethers.getContractFactory("MonkeyVision");
    ;
    await mv.connect(owner).initMarket(market.address);
    await token.grantRole(minterRole, owner.address);
    await token.grantRole(burnerRole, owner.address);

    await token.connect(owner).mint(owner.address, 1000);
    console.log("Deploy successfuly complited")
  }   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
