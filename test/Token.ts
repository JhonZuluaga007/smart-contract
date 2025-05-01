import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  async function deployToken() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    const token = await ethers.deployContract("Token", [owner.address]);
    await token.waitForDeployment();
    
    return { token, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should assign the total supply to the owner", async function () {
      const { token, owner } = await deployToken();
      
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
    
    it("Should set the correct name and symbol", async function () {
      const { token } = await deployToken();
      
      expect(await token.name()).to.equal("TechnicalTest");
      expect(await token.symbol()).to.equal("TCH");
    });
  });
  
  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { token, owner, addr1, addr2 } = await deployToken();
      
      // Transfer 50 tokens from owner to addr1
      await token.transfer(addr1.address, 50);
      expect(await token.balanceOf(addr1.address)).to.equal(50);
      
      // Transfer 50 tokens from addr1 to addr2
      await token.connect(addr1).transfer(addr2.address, 50);
      expect(await token.balanceOf(addr2.address)).to.equal(50);
    });
    
    it("Should fail if sender doesn't have enough tokens", async function () {
      const { token, owner, addr1 } = await deployToken();
      
      const initialOwnerBalance = await token.balanceOf(owner.address);
      
      // Try to send 1 token from addr1 (0 tokens) to owner
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.reverted;
      
      // Owner balance shouldn't have changed
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
}); 