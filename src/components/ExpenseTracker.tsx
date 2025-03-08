import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import MonthlyStats from './MonthlyStats';
import { saveTransactions, loadTransactions, getNextId } from '../utils/storage';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const ExpenseTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const savedTransactions = loadTransactions();
    if (savedTransactions.length > 0) {
      setTransactions(savedTransactions);
    } else {
      const sampleTransactions: Transaction[] = [
        { id: 1, amount: 2500, description: 'Salary', type: 'income', category: 'Salary', date: '2025-02-15' },
        { id: 2, amount: 50, description: 'Groceries', type: 'expense', category: 'Food & Dining', date: '2025-02-16' },
        { id: 3, amount: 120, description: 'Gas', type: 'expense', category: 'Transportation', date: '2025-02-17' }
      ];
      setTransactions(sampleTransactions);
      saveTransactions(sampleTransactions);
    }
  }, []);

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: getNextId(transactions)
    };
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (id: number) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
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

      <MonthlyStats transactions={transactions} />

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
                <div className="transaction-info">
                  <span className="description">{transaction.description}</span>
                  <span className="category">{transaction.category}</span>
                </div>
                <span className="amount">
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </span>
                <span className="date">{transaction.date}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  title="Delete transaction"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;