task("unpause", "To get alloance of address")
.setAction(async (taskArgs) => {
const [first, second] = await hre.ethers.getSigners();

var tradingFloor = await hre.ethers.getContractAt("NFTMarket", process.env.TRADINGFLOOR_ADDRESS);

const result = await tradingFloor
.connect(second)
.unpause(

);

console.log('Transaction hash:',result.hash);
});


