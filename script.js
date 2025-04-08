// DOM Elements
const transactionForm = document.getElementById("transaction-form");
const transactionTable = document.getElementById("transaction-table");
const monthSelect = document.getElementById("month-select");
const viewSummaryButton = document.getElementById("view-summary");
const incomeTotal = document.getElementById("income-total");
const expenseTotal = document.getElementById("expense-total");
const balanceSummary = document.getElementById("balance-summary");

// Transactions Array
let transactions = [];

// Load Transactions from Local Storage
window.onload = () => {
  const savedTransactions = localStorage.getItem("transactions");
  if (savedTransactions) {
    transactions = JSON.parse(savedTransactions);
    updateTransactionTable(transactions);
  }
};

// Add a Transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  const transaction = { description, amount, date };
  transactions.push(transaction);

  // Save to Local Storage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // Update Table
  updateTransactionTable(transactions);

  // Clear Form
  transactionForm.reset();
});

// Update Transaction Table
function updateTransactionTable(transactions) {
  transactionTable.innerHTML = ""; // Clear previous rows
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.description}</td>
      <td>${transaction.amount > 0 ? "+" : ""}${transaction.amount}</td>
      <td>${transaction.date}</td>
    `;
    transactionTable.appendChild(row);
  });
}

// View Monthly Summary
viewSummaryButton.addEventListener("click", () => {
  const selectedMonth = monthSelect.value; // Format: "YYYY-MM"
  if (!selectedMonth) {
    alert("Please select a month!");
    return;
  }

  // Filter Transactions by Selected Month
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(selectedMonth); // Compare "YYYY-MM"
  });

  // Calculate Summary
  let income = 0, expenses = 0;
  filteredTransactions.forEach((transaction) => {
    if (transaction.amount > 0) {
      income += transaction.amount;
    } else {
      expenses += Math.abs(transaction.amount);
    }
  });
  const balance = income - expenses;

  // Display Summary
  incomeTotal.innerText = `Income: $${income}`;
  expenseTotal.innerText = `Expenses: $${expenses}`;
  balanceSummary.innerText = `Balance: $${balance}`;
});