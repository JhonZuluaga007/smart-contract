import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());
  
  const token = await ethers.deployContract("Token", [deployer.address]);
  await token.waitForDeployment();
  
  const tokenAddress = await token.getAddress();
  console.log("Token deployed at:", tokenAddress);
  
  const deploymentData = {
    tokenAddress: tokenAddress,
    network: (await ethers.provider.getNetwork()).name,
    deploymentDate: new Date().toISOString(),
    deployer: deployer.address
  };
  
  const deploymentPath = path.resolve(__dirname, "../deployment.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentData, null, 2));
  console.log(`Deployment information saved to ${deploymentPath}`);
}

// Run the deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 