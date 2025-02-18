const MultiSigWallet = artifacts.require("MultiSigWallet");

contract("MultiSigWallet", (accounts) => {
  let multiSigWallet;
  const [owner1, owner2, owner3, nonOwner] = accounts;
  const numConfirmationsRequired = 2;
  const amount = web3.utils.toWei("1", "ether");

  beforeEach(async () => {
    multiSigWallet = await MultiSigWallet.new([owner1, owner2, owner3], numConfirmationsRequired);
  });

  it("should submit a transaction", async () => {
    await multiSigWallet.submitTransaction(owner1, { from: owner1, value: amount });
    const transaction = await multiSigWallet.transactions(0);

    assert.equal(transaction.to, owner1);
    assert.equal(transaction.value.toString(), amount);
    assert.equal(transaction.executed, false);
  });

  it("should confirm a transaction", async () => {
    await multiSigWallet.submitTransaction(owner1, { from: owner1, value: amount });
    await multiSigWallet.confirmTransaction(0, { from: owner1 });

    const transaction = await multiSigWallet.transactions(0);
    assert.equal(transaction.confirmations, 1);
  });

  it("should execute a transaction with enough confirmations", async () => {
    await multiSigWallet.submitTransaction(owner1, { from: owner1, value: amount });
    await multiSigWallet.confirmTransaction(0, { from: owner1 });
    await multiSigWallet.confirmTransaction(0, { from: owner2 });

    const transaction = await multiSigWallet.transactions(0);
    assert.equal(transaction.executed, true);
  });

  it("should not execute a transaction with insufficient confirmations", async () => {
    await multiSigWallet.submitTransaction(owner1, { from: owner1, value: amount });
    await multiSigWallet.confirmTransaction(0, { from: owner1 });

    const transaction = await multiSigWallet.transactions(0);
    assert.equal(transaction.executed, false);
  });

  it("should revoke a confirmation", async () => {
    await multiSigWallet.submitTransaction(owner1, { from: owner1, value: amount });
    await multiSigWallet.confirmTransaction(0, { from: owner1 });
    await multiSigWallet.revokeConfirmation(0, { from: owner1 });

    const transaction = await multiSigWallet.transactions(0);
    assert.equal(transaction.confirmations, 0);
  });
});

