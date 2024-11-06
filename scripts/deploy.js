// imports
const { ethers, run, network } = require("hardhat");

async function main() {
  const factory = await ethers.getContractFactory("SimpleStorage");
  console.log("Depolying contract...");
  const simpleStorage = await factory.deploy();
  await simpleStorage.waitForDeployment();
  const contractAddress = await simpleStorage.getAddress();
  console.log(`Deployed contract to:${contractAddress}`);

  // verify
  // 在 Etherscan 上验证合约
  console.log("Verifying contract on Etherscan...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // 如果构造函数有参数，在这里添加
    });
    console.log("Contract verified on Etherscan!");
  } catch (error) {
    console.log("Verification failed:", error);
  }

  // interact
  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);
  const res = await simpleStorage.store(7);
  await res.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
