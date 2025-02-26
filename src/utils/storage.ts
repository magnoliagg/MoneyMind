interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const STORAGE_KEY = 'moneymind_transactions';

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Failed to save transactions:', error);
  }
};

export const loadTransactions = (): Transaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load transactions:', error);
    return [];
  }
};

export const getNextId = (transactions: Transaction[]): number => {
  if (transactions.length === 0) return 1;
  return Math.max(...transactions.map(t => t.id)) + 1;
};