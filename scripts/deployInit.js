const fs = require('fs');
const minterRole =ethers.utils.solidityKeccak256(["string"],["MINTER_ROLE"]);
const burnerRole =ethers.utils.solidityKeccak256(["string"],["BURNER_ROLE"]);
    
async function main() {
    const accounts = await ethers.getSigners();
    console.log('Deploying contract with account:',accounts[1].address);
    
    const balance = await accounts[1].getBalance();
    console.log('Account balance ',balance.toString());
    const token = await hre.ethers.getContractAt("ACDM", process.env.TOKEN_ADDRESS);
     
    const mv = await hre.ethers.getContractAt("MonkeyVision", process.env.MONKEYVISION_ADDRESS);
    
    
    await mv.connect(accounts[1]).initMarket(process.env.NFTMARKET_ADDRESS);
    await token.grantRole(minterRole, accounts[1].address);
    await token.grantRole(burnerRole, accounts[1].address);

    await token.connect(accounts[1]).mint(accounts[1].address, 1000);
    console.log("Deploy successfuly complited")
  }   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
