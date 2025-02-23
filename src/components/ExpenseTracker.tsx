import React, { useState } from 'react';
import TransactionForm from './TransactionForm';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: string;
}

const ExpenseTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [nextId, setNextId] = useState(4);

  const sampleTransactions: Transaction[] = [
    { id: 1, amount: 2500, description: 'Salary', type: 'income', date: '2025-02-15' },
    { id: 2, amount: 50, description: 'Groceries', type: 'expense', date: '2025-02-16' },
    { id: 3, amount: 120, description: 'Gas', type: 'expense', date: '2025-02-17' }
  ];

  React.useEffect(() => {
    setTransactions(sampleTransactions);
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: nextId
    };
    setTransactions(prev => [transaction, ...prev]);
    setNextId(prev => prev + 1);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="expense-tracker">
      <h2>Financial Overview</h2>

      <TransactionForm onAddTransaction={handleAddTransaction} />

      <div className="summary">
        <div className="summary-item income">
          <h3>Total Income</h3>
          <p>${totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-item expense">
          <h3>Total Expenses</h3>
          <p>${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-item balance">
          <h3>Balance</h3>
          <p className={balance >= 0 ? 'positive' : 'negative'}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="transactions">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id} className={`transaction ${transaction.type}`}>
                <span className="description">{transaction.description}</span>
                <span className="amount">
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                <span className="date">{transaction.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;