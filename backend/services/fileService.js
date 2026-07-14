const fs = require("fs");
const path = require("path");

const transactionFile = path.join(__dirname, "..", "data", "transactions.json");
const taskFile = path.join(__dirname, "..", "data", "tasks.json");

// Read Transactions
function readTransactions() {
    if (!fs.existsSync(transactionFile)) {
        fs.writeFileSync(transactionFile, "[]");
    }

    const data = fs.readFileSync(transactionFile, "utf8");
    return JSON.parse(data);
}

// Write Transactions
function writeTransactions(data) {
    fs.writeFileSync(transactionFile, JSON.stringify(data, null, 2));
}

// Read Tasks
function readTasks() {
    if (!fs.existsSync(taskFile)) {
        fs.writeFileSync(taskFile, "[]");
    }

    const data = fs.readFileSync(taskFile, "utf8");
    return JSON.parse(data);
}

// Write Tasks
function writeTasks(data) {
    fs.writeFileSync(taskFile, JSON.stringify(data, null, 2));
}

module.exports = {
    readTransactions,
    writeTransactions,
    readTasks,
    writeTasks
};