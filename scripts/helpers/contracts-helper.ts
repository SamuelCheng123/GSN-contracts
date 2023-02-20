import { tEthereumAddress, eContractid } from "./types";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

import hre, { ethers, upgrades } from "hardhat";

export const getDb = (network: string) =>
  low(new FileSync(`./deployments/deployed-contracts-${network}.json`));

export const insertContractAddressInDb = async (
  id: eContractid,
  address: tEthereumAddress
) => {
  console.log(
    "contracts-helpers:insertContractAddressInDb,",
    "id:",
    id,
    "address",
    address
  );
  await getDb(hre.network.name)
    .set(`${id}`, {
      address,
    })
    .write();
};

export const getContractAddressInDb = async (
  id: eContractid
): Promise<tEthereumAddress> => {
  const contractAtDb = await getDb(hre.network.name).get(`${id}`).value();
  if (contractAtDb?.address) {
    return contractAtDb.address as tEthereumAddress;
  }
  throw Error(
    `Missing contract address ${id} at Market config and JSON local db`
  );
};
