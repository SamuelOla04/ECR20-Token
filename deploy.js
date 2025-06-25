const hre = require("hardhat");

async function main() {
    const MyToken = await hre.ethers.getContractFactory("MyToken");
    const initialSupply = hre.ethers.parseUnits("10000000", 18); // 10 million tokens
    const token = await MyToken.deploy(initialSupply);
    console.log("MyToken deployed to:", token.target); // ethers v6 uses .target for address
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});