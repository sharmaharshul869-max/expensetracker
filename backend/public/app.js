// ==========================
// EXPENSE TRACKER
// ==========================

const expenseForm = document.getElementById("expenseForm");
const transactionBody = document.getElementById("transactionBody");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = [];

// Default Date
document.getElementById("date").valueAsDate = new Date();

expenseForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const transaction = {

        id: Date.now(),
        title: document.getElementById("title").value,
        amount: Number(document.getElementById("amount").value),
        type: document.getElementById("type").value

    };

    transactions.push(transaction);

    showTransactions();

    expenseForm.reset();

    document.getElementById("date").valueAsDate = new Date();

});

function showTransactions() {

    transactionBody.innerHTML = "";

    if (transactions.length === 0) {

        transactionBody.innerHTML = `
        <tr>
            <td colspan="4">📭 No Transactions Found</td>
        </tr>
        `;

        balance.innerHTML = "₹0";
        income.innerHTML = "₹0";
        expense.innerHTML = "₹0";

        return;
    }

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(item => {

        if (item.type === "Income") {
            totalIncome += item.amount;
        } else {
            totalExpense += item.amount;
        }

        transactionBody.innerHTML += `
        <tr>
            <td>${item.title}</td>
            <td>₹${item.amount}</td>
            <td>${item.type}</td>
            <td>
                <button class="deleteBtn" onclick="deleteTransaction(${item.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

    income.innerHTML = "₹" + totalIncome;
    expense.innerHTML = "₹" + totalExpense;
    balance.innerHTML = "₹" + (totalIncome - totalExpense);

}

function deleteTransaction(id) {

    transactions = transactions.filter(item => item.id !== id);

    showTransactions();

}

showTransactions();