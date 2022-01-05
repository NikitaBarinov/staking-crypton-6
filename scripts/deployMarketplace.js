const fs = require('fs');

async function main() {
    const accounts = await ethers.getSigners();
    console.log('Deploying contract with account:',accounts[1].address);
    
    const balance = await accounts[1].getBalance();
    console.log('Account balance ',balance.toString());
 
    const TradingFloor = await ethers.getContractFactory("NFTMarket");
    const tradingFloor = await TradingFloor.connect(accounts[1]).deploy(process.env.MONKEYVISION_ADDRESS, process.env.TOKEN_ADDRESS);
    await tradingFloor.deployed();
    
    console.log('NFTMarket address:', tradingFloor.address);
    
    fs.appendFileSync(
      `.env`,
    `\r\# Deployed at \rNFTMARKET_ADDRESS=${tradingFloor.address}\r`
    );
}   

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 
