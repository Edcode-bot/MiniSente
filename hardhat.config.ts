import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      chainId: 8453,
      type: "http",
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
      chainId: 84532,
      type: "http",
    },
  },
  etherscan: {
    apiKey: {
      base: process.env.BASESCAN_API_KEY!,
    },
  },
};

export default config;
