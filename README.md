# MoneyMind

A simple personal finance tracker built with React and TypeScript.

## Features

- ✅ Track income and expenses
- ✅ Categorize transactions
- ✅ Monthly statistics and summaries
- ✅ Local storage persistence
- ✅ Real-time balance calculation

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Open http://localhost:3000 in your browser

## Usage

- **Add Transactions**: Use the form to add new income or expense entries
- **Categories**: Select from predefined categories for better organization
- **Monthly View**: See your current month's financial overview
- **Persistence**: All data is saved locally in your browser

## Built With

- React 18
- TypeScript
- CSS3
- Local Storage API

## Project Structure

```
src/
├── components/
│   ├── ExpenseTracker.tsx    # Main component
│   ├── TransactionForm.tsx   # Add new transactions
│   └── MonthlyStats.tsx      # Monthly overview
├── utils/
│   ├── storage.ts           # Local storage utilities
│   └── categories.ts        # Predefined categories
└── App.tsx                  # Root component
```