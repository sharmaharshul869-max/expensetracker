const {
    readTransactions,
    writeTransactions
} = require("../services/fileService");

// Get All Transactions
const getTransactions = (req, res) => {
    const transactions = readTransactions();
    res.json(transactions);
};

// Add Transaction
const addTransaction = (req, res) => {

    const transactions = readTransactions();

    const newTransaction = {
        id: Date.now(),
        title: req.body.title,
        amount: req.body.amount,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        note: req.body.note
    };

    transactions.push(newTransaction);

    writeTransactions(transactions);

    res.status(201).json({
        success: true,
        message: "Transaction Added Successfully",
        data: newTransaction
    });
};

// Update Transaction
const updateTransaction = (req, res) => {

    const transactions = readTransactions();

    const id = Number(req.params.id);

    const index = transactions.findIndex(
        transaction => transaction.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Transaction not found"
        });
    }

    transactions[index] = {
        ...transactions[index],
        ...req.body
    };

    writeTransactions(transactions);

    res.json({
        success: true,
        message: "Transaction Updated Successfully",
        data: transactions[index]
    });
};

// Delete Transaction
const deleteTransaction = (req, res) => {

    const transactions = readTransactions();

    const id = Number(req.params.id);

    const filteredTransactions = transactions.filter(
        transaction => transaction.id !== id
    );

    if (filteredTransactions.length === transactions.length) {
        return res.status(404).json({
            success: false,
            message: "Transaction not found"
        });
    }

    writeTransactions(filteredTransactions);

    res.json({
        success: true,
        message: "Transaction Deleted Successfully"
    });
};

module.exports = {
    getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
};