const hre = require('hardhat');

const main = async()=>{

  const [deployer] = await hre.ethers.getSigners();

  const Reward =await hre.ethers.getContractFactory("Reward");
  const EHR = await hre.ethers.getContractFactory("EHR");

  const reward = await Reward.deploy();
  const ehr = await EHR.deploy();

  await reward.deployed();
  await ehr.deployed();
  console.log("Reward deployed successfully to :", reward.address);
  console.log("EHR deployed successfully to :", ehr.address);
}


main()
  .then(()=>process.exit(0))
  .catch((error)=>{
    console.error(error);
    process.exit(1);
  });