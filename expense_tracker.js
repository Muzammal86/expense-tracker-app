 const balance = document.getElementById('balance');
 const income = document.getElementById('income');
 const expense = document.getElementById('expense');
 const transactionList = document.getElementById('transactionList');
 const form = document.getElementById('form');
 const textInput = document.getElementById('text');
 const amountInput = document.getElementById('amount');

 let transactions = JSON.parse(localStorage.getItem('expense_tracker_data')) || [];

 function saveTransactionsToStorage() {
    localStorage.setItem('expense_tracker_data', JSON.stringify(transactions));
 }

 function addTransaction(e) {
    e.preventDefault();

    if (textInput.value.trim() === '' || amountInput.value.trim() === '') {
        alert('Please enter both text and amount');
        return;
    }
    let transaction = {
        id: Date.now(),
        text: textInput.value.trim(),
        amount: +amountInput.value
    };

    transactions.push(transaction);

    saveTransactionsToStorage();
    init();

    textInput.value = '';
    amountInput.value = '';
    
 }

 function addTransactionDom(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    item.className = transaction.amount < 0 ? 'minus' : 'plus';

    item.innerHTML = `
            ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">&times;</button>
    `;

    
    transactionList.appendChild(item);
 }

 function updateValues() {
   const amounts = transactions.map(transaction => transaction.amount);

   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

   const incomeTotal = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);

   const expenseTotal = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

   balance.innerText = `$${total}`;
   income.innerText = `$${incomeTotal}`;
   expense.innerText = `$${expenseTotal}`;
 }
 function init() {
   transactionList.innerHTML = '';
   transactions.forEach(addTransactionDom);
   updateValues();
 }

 function removeTransaction(id) {
   transactions = transactions.filter(transaction => transaction.id !== id);
   saveTransactionsToStorage();
   init();
 }
 init();
 form.addEventListener('submit',addTransaction);