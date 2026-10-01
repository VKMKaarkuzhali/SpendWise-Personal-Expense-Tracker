import React, { useState } from 'react';
import TransactionItem from './TransactionItem';
import { formatCurrency } from '../utils/formatters';

/**
 * TransactionList Component
 * Renders filtered transactions, handles empty states, and provides delete confirmation.
 */
const TransactionList = ({
  transactions,
  totalTransactionsCount,
  onEdit,
  onDelete,
  onResetFilters
}) => {
  // State for delete confirmation modal
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      onDelete(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setTransactionToDelete(null);
  };

  // Case 1: No transactions in the entire app
  if (totalTransactionsCount === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">📝</div>
        <h3 className="empty-state-title">No Transactions Yet</h3>
        <p className="empty-state-text">
          Start recording your income and expenses to track your spending habits and view insightful reports.
        </p>
      </div>
    );
  }

  // Case 2: Transactions exist, but filter/search matched nothing
  if (transactions.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">No Matching Transactions</h3>
        <p className="empty-state-text">
          No records matched your search query or filter criteria.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="btn btn-secondary mt-3"
        >
          ↺ Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      {/* Transaction Items */}
      <div className="transaction-items-wrapper">
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            transaction={tx}
            onEdit={onEdit}
            onDeleteRequest={handleDeleteClick}
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {transactionToDelete && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-icon-alert">⚠️</span>
              <h3 className="modal-title">Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to permanently delete this transaction?
              </p>
              <div className="delete-target-preview">
                <strong>{transactionToDelete.title}</strong>
                <span>
                  {transactionToDelete.type === 'income' ? '+' : '-'} {formatCurrency(transactionToDelete.amount)}
                </span>
              </div>
              <p className="delete-warning-note">
                This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                onClick={cancelDelete}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn btn-danger"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
