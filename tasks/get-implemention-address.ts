import {task} from "hardhat/config";
import { getImplementationAddressFromProxy } from '@openzeppelin/upgrades-core';

task("get-impl-address", "")
.addParam("proxyAddress", "The proxy address")
.setAction(async ({proxyAddress}, hre) => {
    console.log('Network:', hre.network.name);
    console.log('Proxy address:', proxyAddress);
    const implementationAddress = await getImplementationAddressFromProxy(hre.ethers.provider, proxyAddress);
    console.log('Implementation Address: ', implementationAddress);
    return implementationAddress;
});

