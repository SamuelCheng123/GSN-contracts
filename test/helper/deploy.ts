const { ethers, upgrades } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { expectRevert, time } = require("@openzeppelin/test-helpers");
const { expecwt } = require("chai");
const hre = require("hardhat");
import { Contract } from "ethers";
import {
  Address,
  Environment,
  HttpClient,
  HttpWrapper,
  IntString,
  RelayHubConfiguration,
  constants,
  defaultEnvironment,
  isSameAddress,
  sleep,
  toNumber
} from '@opengsn/common'

export async function deployGSNContract(deployer: SignerWithAddress) {
  let relayWorker: SignerWithAddress;
  let burnAddress: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let testers: SignerWithAddress[] = [];
  [
    ,
    relayWorker,
    burnAddress,
    user1,
    user2,
    user3,
    ...testers
  ] = await ethers.getSigners();

  // Paymaster
  /**
   * We use TestPaymasterEverythingAccepted
   * This may lead to gas depletion by malicious users in the main network
   */
  const TestPaymasterEverythingAccepted = await ethers.getContractFactory("TestPaymasterEverythingAccepted");
  let paymaster:Contract = await TestPaymasterEverythingAccepted.deploy();
  await paymaster.wait()
  console.log("paymaster:",paymaster.address)

  // Forwarder
  const Forwarder = await ethers.getContractFactory("Forwarder");
  let forwarder:Contract = await Forwarder.deploy();
  await forwarder.wait()
  console.log("forwarder:",forwarder.address)

  // RelayWorker
  console.log("relayWorker:",relayWorker.address)


  // StakeManager
  const StakeManager = await ethers.getContractFactory("StakeManager");
  let stakeManager:Contract = await StakeManager.deploy(
    0, // _maxUnstakeDelay
    0,
    0,
    burnAddress.address,
    deployer.address
  );
  await stakeManager.wait()
  console.log("stakeManager:",stakeManager.address)

  // Penalizer
  const Penalizer = await ethers.getContractFactory("Penalizer");
  let penalizer:Contract = await Penalizer.deploy(
    0, // _penalizeBlockDelay
    0, // _penalizeBlockExpiration
  );
  await penalizer.wait()
  console.log("penalizer:",penalizer.address)

  const zeroAddr = `0x${Number(0).toString(16).padStart(40, '0')}`;

  const stake = ethers.utils.parseEther("1.0")

  // RelayHub
  const RelayHub = await ethers.getContractFactory("RelayHub");
  let relayHub:Contract = await RelayHub.deploy(
    stakeManager.address,
    penalizer.address,
    zeroAddr,
    stake

  );
  await relayHub.wait()
  console.log("relayHub:",relayHub.address)


  // CaptureTheFlag
  /**
   * The main contract to be interact
   */
  const CaptureTheFlag = await ethers.getContractFactory("CaptureTheFlag");
  let captureTheFlag:Contract = await CaptureTheFlag.deploy();
  await captureTheFlag.wait()
  console.log("captureTheFlag:",captureTheFlag.address)


  const deployContract = {
    relayHub: relayHub,
    paymaster: paymaster,
    forwarder: forwarder,
    stakeManager: stakeManager,
    captureTheFlag: captureTheFlag,
  };

  return deployContract;
}
