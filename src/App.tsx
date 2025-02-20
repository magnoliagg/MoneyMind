import React from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import './components/ExpenseTracker.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MoneyMind</h1>
        <p>Personal Finance Tracker</p>
      </header>
      <main>
        <ExpenseTracker />
      </main>
    </div>
  );
}

export default App;