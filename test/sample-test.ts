import { ethers, upgrades } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { time } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

describe("Token", function () {
  let deployer: SignerWithAddress;
  let testers: SignerWithAddress[] = [];

  beforeEach(async function () {
    [deployer, ...testers] = await ethers.getSigners();

  });

  it("should do something right", async function () {
    
    console.log(houseNft.address);
  });
});