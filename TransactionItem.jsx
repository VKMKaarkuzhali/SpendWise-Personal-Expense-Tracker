import React from 'react';
import { formatCurrency, formatDate, getCategoryDetails } from '../utils/formatters';

/**
 * TransactionItem Component
 * Renders an individual transaction row with category badge, formatted amount, and action buttons.
 */
const TransactionItem = ({
  transaction,
  onEdit,
  onDeleteRequest
}) => {
  const { id, title, amount, type, category, date, description } = transaction;
  const isIncome = type === 'income';
  const categoryDetails = getCategoryDetails(category);

  return (
    <div className={`transaction-item ${isIncome ? 'item-income' : 'item-expense'}`}>
      {/* Category Icon Badge */}
      <div
        className="item-icon-box"
        style={{ backgroundColor: `${categoryDetails.color}15`, color: categoryDetails.color }}
      >
        <span className="item-icon">{categoryDetails.icon}</span>
      </div>

      {/* Title, Category & Description */}
      <div className="item-details">
        <div className="item-title-row">
          <h4 className="item-title">{title}</h4>
          <span className={`badge-type ${isIncome ? 'badge-income' : 'badge-expense'}`}>
            {isIncome ? 'Income' : 'Expense'}
          </span>
        </div>

        <div className="item-meta">
          <span className="meta-category">
            {category}
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-date">
            📅 {formatDate(date)}
          </span>
        </div>

        {description && (
          <p className="item-description">{description}</p>
        )}
      </div>

      {/* Amount Display */}
      <div className="item-amount-wrapper">
        <span className={`item-amount ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(amount)}
        </span>
      </div>

      {/* Actions (Edit / Delete) */}
      <div className="item-actions">
        <button
          type="button"
          onClick={() => onEdit(transaction)}
          className="btn-action btn-edit"
          title="Edit this transaction"
          aria-label={`Edit ${title}`}
        >
          ✏️ <span className="action-text">Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDeleteRequest(transaction)}
          className="btn-action btn-delete"
          title="Delete this transaction"
          aria-label={`Delete ${title}`}
        >
          🗑️ <span className="action-text">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
