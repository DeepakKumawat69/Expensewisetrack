// Load transactions from localStorage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(description, amount, type, category = '') {
    const transaction = {
        id: Date.now(),
        description,
        amount: parseFloat(amount),
        type, // 'income' or 'expense'
        category,
        date: new Date().toLocaleDateString()
    };
    
    transactions.push(transaction);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateBalance();
}

function updateBalance() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    document.getElementById('balance').textContent = (income - expenses).toFixed(2);
}