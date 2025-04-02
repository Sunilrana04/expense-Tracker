// script.js

// State management
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editingExpenseId = null;

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const categorySelect = document.getElementById('category');
const customCategoryGroup = document.getElementById('customCategoryGroup');
const submitBtn = document.getElementById('submitBtn');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

// Charts
let pieChart, barChart;
initializeCharts();

// Event Listeners
categorySelect.addEventListener('change', () => {
    customCategoryGroup.style.display = categorySelect.value === 'custom' ? 'block' : 'none';
});

expenseForm.addEventListener('submit', handleSubmit);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

// Functions
function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = categorySelect.value === 'custom'
        ? document.getElementById('customCategory').value
        : categorySelect.value;
    const date = document.getElementById('date').value;

    if (editingExpenseId) {
        updateExpense(editingExpenseId, { name, amount, category, date });
    } else {
        addExpense({ name, amount, category, date });
    }

    expenseForm.reset();
    document.getElementById('date').valueAsDate = new Date();
    customCategoryGroup.style.display = 'none';
    editingExpenseId = null;
    submitBtn.textContent = 'Add Expense';
}

function addExpense(expense) {
    expenses.push({ ...expense, id: Date.now() });
    saveAndUpdateUI();
}

function updateExpense(id, updatedExpense) {
    expenses = expenses.map(expense =>
        expense.id === id ? { ...updatedExpense, id } : expense
    );
    saveAndUpdateUI();
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveAndUpdateUI();
}

function editExpense(id) {
    const expense = expenses.find(exp => exp.id === id);
    if (!expense) return;

    document.getElementById('name').value = expense.name;
    document.getElementById('amount').value = expense.amount;

    if (['Food', 'Travel', 'Entertainment', 'Miscellaneous'].includes(expense.category)) {
        categorySelect.value = expense.category;
        customCategoryGroup.style.display = 'none';
    } else {
        categorySelect.value = 'custom';
        customCategoryGroup.style.display = 'block';
        document.getElementById('customCategory').value = expense.category;
    }

    document.getElementById('date').value = expense.date;

    editingExpenseId = id;
    submitBtn.textContent = 'Update Expense';
}

function saveAndUpdateUI() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateStats();
    updateCharts();
    renderExpensesList();
}

function updateStats() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById('totalExpenses').textContent = `$${total.toFixed(2)}`;

    const largest = expenses.reduce((max, exp) => Math.max(max, exp.amount), 0);
    document.getElementById('largestExpense').textContent = `$${largest.toFixed(2)}`;

    const categoryTotals = {};
    const categoryCounts = {};
    expenses.forEach(exp => {
        categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
        categoryCounts[exp.category] = (categoryCounts[exp.category] || 0) + 1;
    });

    const averagesHtml = Object.entries(categoryTotals)
        .map(([category, total]) => {
            const average = total / categoryCounts[category];
            return `<p>${category}: $${average.toFixed(2)}</p>`;
        })
        .join('');
    document.getElementById('categoryAverages').innerHTML = averagesHtml;
}

function initializeCharts() {
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const barCtx = document.getElementById('barChart').getContext('2d');

    pieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Expenses by Category',
                data: [],
                backgroundColor: '#36A2EB',
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateCharts() {
    const categoryTotals = expenses.reduce((acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
        return acc;
    }, {});

    const categories = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = values;
    pieChart.update();

    barChart.data.labels = categories;
    barChart.data.datasets[0].data = values;
    barChart.update();
}

function renderExpensesList() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(expense => `
            <tr>
                <td>${expense.name}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editExpense(${expense.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            </tr>
        `)
        .join('');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Initialize the app
document.getElementById('date').valueAsDate = new Date();
saveAndUpdateUI();
