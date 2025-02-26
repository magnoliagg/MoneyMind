import React, { useState } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../utils/categories';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    amount: number;
    description: string;
    type: 'income' | 'expense';
    category: string;
    date: string;
  }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  React.useEffect(() => {
    setCategory(categories[0]);
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !description) {
      alert('Please fill in all fields');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    onAddTransaction({
      amount: numAmount,
      description,
      type,
      category,
      date
    });

    setAmount('');
    setDescription('');
    setType('expense');
    setCategory(EXPENSE_CATEGORIES[0]);
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="transaction-form">
      <h3>Add New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as 'income' | 'expense')}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className={`submit-btn ${type}`}>
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;