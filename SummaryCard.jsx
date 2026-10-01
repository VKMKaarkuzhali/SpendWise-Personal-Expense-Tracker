import React from 'react';
import { formatCurrency } from '../utils/formatters';

/**
 * SummaryCard Component
 * Reusable metric card displaying Income, Expenses, Balance, and Counts.
 * 
 * Props:
 * - title: string
 * - amount: number (or raw number for counts)
 * - icon: string/emoji
 * - type: 'income' | 'expense' | 'balance' | 'count'
 * - subtitle: string (optional context note)
 * - isCount: boolean (if true, formats as plain number instead of currency)
 */
const SummaryCard = ({
  title,
  amount,
  icon,
  type = 'balance',
  subtitle,
  isCount = false
}) => {
  // Determine styling class based on type
  const cardTypeClass = `summary-card--${type}`;

  const formattedValue = isCount
    ? Number(amount || 0).toLocaleString('en-IN')
    : formatCurrency(amount || 0);

  return (
    <div className={`summary-card ${cardTypeClass}`}>
      <div className="summary-card-header">
        <span className="summary-card-title">{title}</span>
        <div className="summary-card-icon-wrapper">
          <span className="summary-card-icon">{icon}</span>
        </div>
      </div>

      <div className="summary-card-body">
        <h3 className="summary-card-amount">{formattedValue}</h3>
        {subtitle && <p className="summary-card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SummaryCard;
