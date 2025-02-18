require("@nomiclabs/hardhat-waffle"); // Required to use Waffle for testing

module.exports = {
  solidity: "0.8.7",  // Solidity version to use
  networks: {
    hardhat: {
      chainId: 1337,  // Default Hardhat network chain ID
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`, // Infura Ropsten endpoint
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Private key for the account to deploy
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  paths: {
    sources: "./contracts", // Path to your Solidity contracts
    tests: "./test",        // Path to your test files
    cache: "./cache",       // Path to cache
    artifacts: "./artifacts" // Path to store artifacts
  }
};

