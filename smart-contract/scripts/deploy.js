const { ethers } = require("hardhat");

async function main() {
  const SimpleVoting = await ethers.getContractFactory("SimpleVoting");
  const voter = await SimpleVoting.deploy();

  await voter.deployed();

  console.log("SimpleVoting deployed to: %s", voter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
