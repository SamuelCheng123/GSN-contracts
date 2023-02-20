import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";
// import "@openzeppelin/hardhat-defender";

require("dotenv").config();
import "./tasks";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
const {
  DEPLOYER_PRIVATE_KEY,
  RELAY_WORKER,
  USER1,
} = process.env;
if (
  !DEPLOYER_PRIVATE_KEY ||
  !RELAY_WORKER ||
  !USER1
) {
  throw new Error("Missing ENV Key");
}
const accounts = [
  DEPLOYER_PRIVATE_KEY,
  RELAY_WORKER,
  USER1,
];
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
      accounts,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_API_KEY}`,
      accounts,
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_MATIC_API_KEY}`,
      accounts,
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_API_KEY}`,
      // gasPrice: 100000000000,
      accounts,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
      mining: {
        auto: true,
        interval: [13 * 1000, 15 * 1000],
      },
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
        blockNumber: 12772572,
      },
    },
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY
        ? process.env.ETHERSCAN_API_KEY
        : "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY
        ? process.env.POLYGONSCAN_API_KEY
        : "",
    },
  },
};

export default config;
