const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "localhost",  // Local Ganache network
      port: 8545,         // Port where Ganache is running
      network_id: "*",    // Matches any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC, // Mnemonic for your wallet, from .env file
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}` // Infura Ropsten URL
      ),
      network_id: 3,          // Ropsten network id
      gas: 5500000,           // Max gas limit
      confirmations: 2,       // Number of confirmations before considering a transaction as successful
      timeoutBlocks: 200,     // Timeout for waiting for a block to confirm
      skipDryRun: true        // Skip dry run before deployment
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 4,          // Rinkeby network id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    mainnet: {
      provider: () => new HDWalletProvider(
        process.env.MNEMONIC,
        `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 1,          // Ethereum mainnet network id
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.7",       // Use the appropriate version of Solidity
    }
  }
};

