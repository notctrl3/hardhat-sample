require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const eth_sepolia = process.env.RPC_URL;
const private_key = process.env.PRIVATE_KEY;
const ethersacn_api_key = process.env.ETHERSCAN_API_KEY;

module.exports = {
  networks: {
    sepolia: {
      url: eth_sepolia,
      accounts: [private_key],
      chainId: 11155111,
    },
  },
  solidity: "0.8.27",
  etherscan: {
    apiKey: ethersacn_api_key,
  },
};
