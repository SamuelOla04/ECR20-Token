const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
    let MyToken;
    let token;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        MyToken = await ethers.getContractFactory("MyToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        token = await MyToken.deploy();
        await token.deployed();
    });

    describe("Deployment", function () {
        it("should set the right owner", async function () {
            expect(await token.owner()).to.equal(owner.address);
        });

        it("should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await token.balanceOf(owner.address);
            const totalSupply = await token.totalSupply();
            expect(ownerBalance).to.equal(totalSupply);
        });
    });

    describe("Transfers", function () {
        it("should transfer tokens between accounts", async function () {
            await token.transfer(addr1.address, 100);
            expect(await token.balanceOf(addr1.address)).to.equal(100);
        });

        it("should fail if sender doesn't have enough tokens", async function () {
            await expect(
                token.connect(addr1).transfer(owner.address, 100)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
        });
    });
});
describe("Pauseable",function() {
    it("should pause and unpause the contract",async function () {
        await token.pause();
        expect(await token.paused()).to.equal(true);
        await token.unpause();
        expect(await token.paused()).to.equal(false);
    });
    it("should not allow transfers when paused",async function () {
        await token.pause();
         await expect(
            token.transfer(addr1.address,100)
         ).to.be.revertedWith("pauseable:paused")

    });
    });



