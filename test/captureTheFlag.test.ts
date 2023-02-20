const { ethers, upgrades } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { expectRevert, time } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const hre = require("hardhat");
import { Contract } from "ethers";

import { deployGSNContract } from "./helper/deploy";




describe("Capture the flag GSN test",function(){
    let deployer: SignerWithAddress;
    let relayWorker: SignerWithAddress;
    let testers: SignerWithAddress[] = [];

    let relayHub:Contract
    let paymaster:Contract
    let forwarder:Contract
    let captureTheFlag:Contract

    beforeEach(async function(){
        [
            deployer,
            relayWorker,
            ... testers
        ] = await ethers.getSigners();

        const deployContract = await deployGSNContract(deployer);

        relayHub =
        deployContract["relayHub" as keyof typeof deployContract];

        paymaster =
        deployContract["paymaster" as keyof typeof deployContract];

        forwarder =
        deployContract["forwarder" as keyof typeof deployContract];

        captureTheFlag =
        deployContract["captureTheFlag" as keyof typeof deployContract];

        
    })




})
