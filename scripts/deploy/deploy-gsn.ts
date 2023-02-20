const { deploy } = require("@openzeppelin/hardhat-upgrades/dist/utils");
const { BigNumber } = require("@ethersproject/bignumber");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { ethers, upgrades , run } = require("hardhat");
import {
  insertContractAddressInDb,
  getContractAddressInDb,
} from "../helpers/contracts-helper";
import { eContractid, tEthereumAddress } from "../helpers/types";


async function main() {
  let deployer      :SignerWithAddress;
  let relayWorker : SignerWithAddress;
  let testers       :SignerWithAddress[] = [];
  [
    deployer,
    relayWorker,
    ...testers
  ] = await ethers.getSigners();

  // RelayHub
  const RelayHub = await ethers.getContractFactory("RelayHub");
  let relayHub = await RelayHub.deploy();
  await relayHub.wait()
  await insertContractAddressInDb(eContractid.RelayHub, relayHub.address);
  console.log("relayHub:",relayHub.address)

  // Paymaster
  /**
   * We use TestPaymasterEverythingAccepted
   * This may lead to gas depletion by malicious users in the main network
   */
  const TestPaymasterEverythingAccepted = await ethers.getContractFactory("TestPaymasterEverythingAccepted");
  let paymaster = await TestPaymasterEverythingAccepted.deploy();
  await paymaster.wait()
  await insertContractAddressInDb(eContractid.Paymaster, paymaster.address);
  console.log("paymaster:",paymaster.address)

  // Forwarder
  const Forwarder = await ethers.getContractFactory("Forwarder");
  let forwarder = await Forwarder.deploy();
  await forwarder.wait()
  await insertContractAddressInDb(eContractid.Forwarder, forwarder.address);
  console.log("forwarder:",forwarder.address)

  // RelayWorker
  await insertContractAddressInDb(eContractid.RelayWorker, relayWorker.address);
  console.log("relayWorker:",relayWorker.address)

  // CaptureTheFlag
  /**
   * The main contract to be interact
   */
  const CaptureTheFlag = await ethers.getContractFactory("CaptureTheFlag");
  let captureTheFlag = await CaptureTheFlag.deploy();
  await captureTheFlag.wait()
  await insertContractAddressInDb(eContractid.CaptureTheFlag, captureTheFlag.address);
  console.log("captureTheFlag:",captureTheFlag.address)

  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });