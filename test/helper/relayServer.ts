const { ethers, upgrades } = require("hardhat");
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const { expectRevert, time } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");
const hre = require("hardhat");
import { Contract } from "ethers";



export const userCallRelayServer = async (
    targetContract:Contract,
    functionData:string,
    userAddress:SignerWithAddress,
    msgValue:BigInt,
    Nonce:Number,
    gas:Number,
    ValidUntilTime:Number,
    relayData:String,  
    relayWorker:string,
    transactionCalldataGasUsed:Number,
    paymasterData:String,
    maxFeePerGas:Number,
    maxPriorityFeePerGas:Number,
    paymaster:Contract,
    clientId:Number,
    forwarder:Contract
) => {

}