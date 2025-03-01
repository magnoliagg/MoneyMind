import React from 'react';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface MonthlyStatsProps {
  transactions: Transaction[];
}

const MonthlyStats: React.FC<MonthlyStatsProps> = ({ transactions }) => {
  const getCurrentMonth = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };

  const currentMonth = getCurrentMonth();

  const thisMonthTransactions = transactions.filter(t =>
    t.date.startsWith(currentMonth)
  );

  const thisMonthIncome = thisMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const thisMonthExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryExpenses = thisMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryExpenses)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const getMonthName = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="monthly-stats">
      <h3>{getMonthName(currentMonth)} Overview</h3>

      <div className="monthly-summary">
        <div className="stat-item">
          <span className="stat-label">This Month Income</span>
          <span className="stat-value income">${thisMonthIncome.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">This Month Expenses</span>
          <span className="stat-value expense">${thisMonthExpenses.toFixed(2)}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Net This Month</span>
          <span className={`stat-value ${thisMonthIncome - thisMonthExpenses >= 0 ? 'positive' : 'negative'}`}>
            ${(thisMonthIncome - thisMonthExpenses).toFixed(2)}
          </span>
        </div>
      </div>

      {topCategories.length > 0 && (
        <div className="top-categories">
          <h4>Top Spending Categories</h4>
          <ul>
            {topCategories.map(([category, amount]) => (
              <li key={category}>
                <span className="category-name">{category}</span>
                <span className="category-amount">${amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="transaction-count">
        <span>{thisMonthTransactions.length} transactions this month</span>
      </div>
    </div>
  );
};

export default MonthlyStats;