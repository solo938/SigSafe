// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract MultiSigWallet {
    
    address[] public owners;
    uint public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint value;
        bool executed;
        uint confirmations;
    }

    mapping(uint => mapping(address => bool)) public isConfirmed;
    Transaction[] public transactions;

    event TransactionSubmitted(uint transactionId, address indexed sender, address indexed receiver, uint amount);
    event TransactionConfirmed(uint transactionId, address indexed owner);
    event TransactionExecuted(uint transactionId);
    event TransactionRevoked(uint transactionId, address indexed owner);

    modifier onlyOwner() {
        bool isOwner = false;
        for (uint i = 0; i < owners.length; i++) {
            if (msg.sender == owners[i]) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Not an owner");
        _;
    }

    constructor(address[] memory _owners, uint _numConfirmationsRequired) {
        require(_owners.length > 1, "At least two owners are required");
        require(_numConfirmationsRequired > 0 && _numConfirmationsRequired <= _owners.length, "Invalid number of confirmations");

        for (uint i = 0; i < _owners.length; i++) {
            require(_owners[i] != address(0), "Invalid owner address");
            owners.push(_owners[i]);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    function submitTransaction(address _to) public payable onlyOwner {
        require(_to != address(0), "Invalid receiver address");
        require(msg.value > 0, "Amount must be greater than 0");

        uint transactionId = transactions.length;
        transactions.push(Transaction({
            to: _to,
            value: msg.value,
            executed: false,
            confirmations: 0
        }));

        emit TransactionSubmitted(transactionId, msg.sender, _to, msg.value);
    }

    function confirmTransaction(uint _transactionId) public onlyOwner {
        require(_transactionId < transactions.length, "Invalid transaction ID");
        require(!isConfirmed[_transactionId][msg.sender], "Transaction already confirmed");

        isConfirmed[_transactionId][msg.sender] = true;
        transactions[_transactionId].confirmations += 1;
        emit TransactionConfirmed(_transactionId, msg.sender);

        if (transactions[_transactionId].confirmations >= numConfirmationsRequired) {
            executeTransaction(_transactionId);
        }
    }

    function revokeConfirmation(uint _transactionId) public onlyOwner {
        require(_transactionId < transactions.length, "Invalid transaction ID");
        require(isConfirmed[_transactionId][msg.sender], "Transaction not confirmed by sender");

        isConfirmed[_transactionId][msg.sender] = false;
        transactions[_transactionId].confirmations -= 1;
        emit TransactionRevoked(_transactionId, msg.sender);
    }

    function executeTransaction(uint _transactionId) public payable onlyOwner {
        require(_transactionId < transactions.length, "Invalid transaction ID");
        require(!transactions[_transactionId].executed, "Transaction already executed");
        require(transactions[_transactionId].confirmations >= numConfirmationsRequired, "Not enough confirmations");

        (bool success, ) = transactions[_transactionId].to.call{value: transactions[_transactionId].value}("");
        require(success, "Transaction execution failed");

        transactions[_transactionId].executed = true;
        emit TransactionExecuted(_transactionId);
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(uint _transactionId) public view returns (address to, uint value, bool executed, uint confirmations) {
        require(_transactionId < transactions.length, "Invalid transaction ID");
        Transaction storage txn = transactions[_transactionId];
        return (txn.to, txn.value, txn.executed, txn.confirmations);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }
}

