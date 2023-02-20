const { BN } = require("@openzeppelin/test-helpers");
const ethWallet = require("ethereumjs-wallet").default;

export function toBN(x: Number) {
  return new BN(x);
}

export function generateSalt() {
  return ethWallet.generate().getPrivateKeyString().substr(0, 34);
}
