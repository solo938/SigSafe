
# SigSafe: Multi-Signature Wallet

SigSafe is a decentralized multi-signature wallet built using Solidity. It requires multiple confirmations from owners before a transaction can be executed, ensuring enhanced security and preventing unauthorized access.

## Features

- **Multiple owners**: Secure your wallet with multiple owners.
- **Transaction submission**: Submit transactions with a specified amount to another address.
- **Transaction confirmations**: Multiple owners can confirm transactions.
- **Execution of confirmed transactions**: Transactions are executed when the required number of confirmations is met.
- **Revoke confirmations**: Owners can revoke their confirmations.

## Technology Stack

- **Solidity**: Smart contract development
- **Hardhat** / **Truffle**: Ethereum development framework
- **Web3.js / Ethers.js**: Ethereum JavaScript libraries
- **Infura**: Connect to the Ethereum network

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/sigsafe.git
   cd sigsafe
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file and add your Infura API key and wallet mnemonic/private key:

   ```env
   INFURA_API_KEY=your_infura_api_key_here
   PRIVATE_KEY=your_private_key_here
   MNEMONIC="your wallet mnemonic phrase here"
   ```

## Configuration

- **Hardhat Configuration**: Modify `hardhat.config.js` to configure the networks you intend to deploy to (e.g., Ropsten, Mainnet).
- **Truffle Configuration**: Modify `truffle-config.js` to specify network details and wallet configurations.

## Usage

### Deploying the Contract

1. **Hardhat**:

   Deploy using the following command:

   ```bash
   npx hardhat run scripts/deploy.js --network ropsten
   ```

2. **Truffle**:

   Deploy using the following command:

   ```bash
   truffle migrate --network ropsten
   ```

### Interacting with the Contract

After deployment, you can interact with the contract using web3.js or ethers.js in your front-end application or via Hardhat/Truffle scripts.

## Testing

Run unit tests to ensure that the contract behaves as expected.

- **Hardhat**:

  ```bash
  npx hardhat test
  ```

- **Truffle**:

  ```bash
  truffle test
  ```

## Contributing

Feel free to fork the project, open issues, or submit pull requests. Contributions are welcome!

---

Feel free to customize the repository URL and any other details based on your project structure!
