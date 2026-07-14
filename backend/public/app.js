// ==========================
// EXPENSE TRACKER
// ==========================

const expenseForm = document.getElementById("expenseForm");
const transactionBody = document.getElementById("transactionBody");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

let transactions = [];
let editId = null;

// Default Date
document.getElementById("date").valueAsDate = new Date();

// ==========================
// Load Transactions
// ==========================

async function loadTransactions() {

    const response = await fetch("/api/transactions");

    transactions = await response.json();

    showTransactions();

}

// ==========================
// Add / Update Transaction
// ==========================

expenseForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const transaction = {

        title: document.getElementById("title").value,
        amount: Number(document.getElementById("amount").value),
        type: document.getElementById("type").value,
        category: document.getElementById("category").value,
        date: document.getElementById("date").value,
        note: document.getElementById("note").value

    };

    if (editId !== null) {

        const response = await fetch(`/api/transactions/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(transaction)

        });

        if (!response.ok) {
            alert("Update Failed");
            return;
        }

        editId = null;

    } else {

        const response = await fetch("/api/transactions", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(transaction)

        });

        if (!response.ok) {
            alert("Add Failed");
            return;
        }

    }

    expenseForm.reset();

    document.getElementById("submitBtn").innerText = "Add Transaction";

    document.getElementById("date").valueAsDate = new Date();

    await loadTransactions();

});

// ==========================
// Show Transactions
// ==========================

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
            totalIncome += Number(item.amount);
        } else {
            totalExpense += Number(item.amount);
        }

        transactionBody.innerHTML += `
        <tr>
            <td>${item.title}</td>
            <td>₹${item.amount}</td>
            <td>${item.type}</td>
            <td>
                <button onclick="editTransaction(${item.id})">
                    Edit
                </button>

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

// ==========================
// Edit Transaction
// ==========================

function editTransaction(id) {

    const transaction = transactions.find(item => item.id == id);

    if (!transaction) return;

    editId = id;

    document.getElementById("title").value = transaction.title;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("type").value = transaction.type;
    document.getElementById("category").value = transaction.category;
    document.getElementById("date").value = transaction.date;
    document.getElementById("note").value = transaction.note;

    document.getElementById("submitBtn").innerText = "Update Transaction";

}

// ==========================
// Delete Transaction
// ==========================

async function deleteTransaction(id) {

    const confirmDelete = confirm("Are you sure you want to delete this transaction?");

    if (!confirmDelete) return;

    const response = await fetch(`/api/transactions/${id}`, {

        method: "DELETE"

    });

    if (!response.ok) {

        alert("Delete Failed");

        return;

    }

    await loadTransactions();

}

// ==========================
// Initial Load
// ==========================

loadTransactions();