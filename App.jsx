import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import { INITIAL_TRANSACTIONS } from './data/sampleData';
import { calculateTotals } from './utils/formatters';

// Storage Key defined in requirements
const STORAGE_KEY = 'spendwise_transactions';

function App() {
  /**
   * Application State: transactions
   * Initialized from LocalStorage if available; otherwise uses INITIAL_TRANSACTIONS
   */
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only use saved if it's an array
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error reading transactions from LocalStorage:', error);
    }
    // Fallback to sample data when LocalStorage is empty
    return INITIAL_TRANSACTIONS;
  });

  /**
   * Effect Hook: Sync transactions to LocalStorage whenever transactions state changes
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error saving transactions to LocalStorage:', error);
    }
  }, [transactions]);

  /**
   * Handler: Add new transaction
   */
  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  /**
   * Handler: Update an existing transaction (replaces matching id)
   */
  const handleUpdateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === updatedTx.id ? updatedTx : tx))
    );
  };

  /**
   * Handler: Delete a transaction by ID
   */
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  /**
   * Handler: Reset to sample initial transactions
   */
  const handleResetToSampleData = () => {
    setTransactions(INITIAL_TRANSACTIONS);
  };

  /**
   * Handler: Clear all transactions completely
   */
  const handleClearAllTransactions = () => {
    if (window.confirm('Are you sure you want to clear all transactions?')) {
      setTransactions([]);
    }
  };

  // Calculate live totals for Navbar and general summary
  const { balance } = calculateTotals(transactions);

  return (
    <div className="app-layout">
      {/* Top Navigation Bar */}
      <Navbar totalBalance={balance} />

      {/* Main Content Area Routed by React Router */}
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Dashboard transactions={transactions} />}
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                transactions={transactions}
                onAddTransaction={handleAddTransaction}
                onUpdateTransaction={handleUpdateTransaction}
                onDeleteTransaction={handleDeleteTransaction}
                onResetToSampleData={handleResetToSampleData}
              />
            }
          />
          <Route
            path="/reports"
            element={<Reports transactions={transactions} />}
          />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Student Project Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-left">
            <p className="footer-brand">
              💰 <strong>SpendWise</strong> – Personal Expense Tracker
            </p>
            <p className="footer-subtext">
              Full Stack Web Development Task 2 Project • ReactJS & LocalStorage
            </p>
          </div>

          <div className="footer-actions">
            <button
              type="button"
              onClick={handleResetToSampleData}
              className="footer-btn"
              title="Reload the 4-7 sample demo transactions"
            >
              🔄 Reload Sample Data
            </button>
            <button
              type="button"
              onClick={handleClearAllTransactions}
              className="footer-btn footer-btn-danger"
              title="Delete all transactions to test empty state"
            >
              🗑️ Clear All Data
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
