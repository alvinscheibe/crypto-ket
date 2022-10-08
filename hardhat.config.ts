import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import fs from 'fs';

const privateKey = fs.readFileSync('.secret').toString().trim();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};

export default config;
