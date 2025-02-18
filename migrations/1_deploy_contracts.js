const MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = function(deployer) {
  // List of owners (replace with actual Ethereum addresses)
  const owners = ["0xOwnerAddress1", "0xOwnerAddress2", "0xOwnerAddress3"];
  const numConfirmationsRequired = 2; // Number of confirmations required to execute a transaction

  deployer.deploy(MultiSigWallet, owners, numConfirmationsRequired);
};

