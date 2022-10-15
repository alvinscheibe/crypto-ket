import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
import fs from 'fs';

const privateKey = fs.readFileSync('.secret').toString().trim();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/PfHPQgyvyR7yKZ-dip_YxAcNyJE9gsex',
      accounts: [privateKey]
    }
  }
};

export default config;
