let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editId = null;

window.onload = function () {
    displayExpenses();
};

// SAVE (IMPORTANT)
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ADD / UPDATE
function addExpense() {

    const title = document.getElementById("title").value.trim();
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    const titleError = document.getElementById("titleError");
    titleError.innerText = "";

    const titleRegex = /^[A-Za-z ]+$/;

    if (!titleRegex.test(title)) {
        titleError.innerText = "Only letters and spaces allowed.";
        return;
    }

    if (amount <= 0 || amount === "") {
        alert("Enter valid amount");
        return;
    }

    if (editId) {

        const index = expenses.findIndex(e => e.id === editId);

        if (index !== -1) {
            expenses[index] = {
                ...expenses[index],
                title,
                amount: Number(amount),
                category
            };
        }

        editId = null;

    } else {

        const expense = {
            id: Date.now(),
            title,
            amount: Number(amount),
            category,
            date: new Date().toISOString()
        };

        expenses.push(expense);
    }

    saveExpenses();
    displayExpenses();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
}

// EDIT
function editExpense(id) {

    const expense = expenses.find(e => e.id === id);

    if (!expense) return;

    document.getElementById("title").value = expense.title;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("category").value = expense.category;

    editId = id;
}

// DELETE
function deleteExpense(id) {

    expenses = expenses.filter(e => e.id !== id);

    saveExpenses();
    displayExpenses();
}

// DISPLAY
function displayExpenses() {

    const list = document.getElementById("list");
    if (!list) return;

    list.innerHTML = "";

    let total = 0;

    expenses.forEach(exp => {

        total += exp.amount;

        const li = document.createElement("li");

        li.innerHTML = `
            <b>${exp.title}</b><br>
            ₹${exp.amount} | ${exp.category}<br>

            <button onclick="editExpense(${exp.id})">✏️ Edit</button>
            <button onclick="deleteExpense(${exp.id})">❌ Delete</button>
        `;

        list.appendChild(li);
    });

    checkBudget(total);
}

// RESET
function resetData() {

    if (confirm("Delete all expenses?")) {

        expenses = [];

        saveExpenses();
        displayExpenses();
    }
}

// SEARCH + FILTER
function applyFilters() {

    const search = document.getElementById("searchTitle").value.toLowerCase();
    const category = document.getElementById("filterCategory").value;

    const list = document.getElementById("list");
    list.innerHTML = "";

    expenses
        .filter(e =>
            e.title.toLowerCase().includes(search) &&
            (category === "All" || e.category === category)
        )
        .forEach(exp => {

            const li = document.createElement("li");

            li.innerHTML = `
                <b>${exp.title}</b><br>
                ₹${exp.amount} | ${exp.category}<br>

                <button onclick="editExpense(${exp.id})">✏️ Edit</button>
                <button onclick="deleteExpense(${exp.id})">❌ Delete</button>
            `;

            list.appendChild(li);
        });
}

// BUDGET
function checkBudget(total) {

    const budget = Number(document.getElementById("budget").value);
    const alertBox = document.getElementById("budgetAlert");

    if (!alertBox) return;

    if (budget && total > budget) {
        alertBox.innerHTML = `⚠ Over Budget by ₹${total - budget}`;
    } else {
        alertBox.innerHTML = "";
    }
}

// ANALYSIS PAGE
function goToAnalysis() {
    saveExpenses();
    window.location.href = "analysis.html";
}
