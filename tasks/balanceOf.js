task("balanceOf", "To get balance of address")
.addParam("addressOf", "The account address")
.setAction(async (taskArgs) => {

const token = await hre.ethers.getContractAt("ACDM721", process.env.ERC721_ADDRESS)

const result = await token.balanceOf(taskArgs.addressOf);
balance = result.toNumber();
    
console.log('Balance:',balance); 
});
