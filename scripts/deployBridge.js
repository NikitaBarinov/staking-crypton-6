const fs = require('fs');

async function main() {
    const accounts = await ethers.getSigners();
    console.log('Deploying contract with account:',accounts[1].address);
    
    const balance = await accounts[1].getBalance();
    console.log('Account balance ',balance.toString());
 
    const TradingFloor = await ethers.getContractFactory("Bridge");
    const tradingFloor = await TradingFloor.connect(accounts[1]).deploy(accounts[1].address, process.env.BRIDGE_ADDRESS);
    await tradingFloor.deployed();
    
    console.log('Bridge address:', tradingFloor.address);
    
    console.log(network.name);

    fs.appendFileSync(
      `.env-${network.name}`,
    `\r\# Deployed at \rBRIDGE_ADDRESS=${tradingFloor.address}\r`
    );
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
