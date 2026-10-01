import React from 'react';
import { formatCurrency, getCategorySummary } from '../utils/formatters';

/**
 * CategorySummary Component
 * Shows a breakdown of expenses by category with progress bars and percentages.
 */
const CategorySummary = ({ transactions, limit = null, title = "Expense by Category" }) => {
  const summary = getCategorySummary(transactions, 'expense');
  const displayedSummary = limit ? summary.slice(0, limit) : summary;

  if (summary.length === 0) {
    return (
      <div className="category-summary-card">
        <h3 className="section-title">{title}</h3>
        <div className="empty-category-notice">
          <span>📊</span>
          <p>No expense data available to display category breakdown.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-summary-card">
      <div className="card-header-flex">
        <h3 className="section-title">{title}</h3>
        <span className="category-count-badge">
          {summary.length} {summary.length === 1 ? 'Category' : 'Categories'}
        </span>
      </div>

      <div className="category-bars-list">
        {displayedSummary.map((item) => (
          <div key={item.category} className="category-bar-item">
            {/* Header info for category */}
            <div className="category-bar-header">
              <div className="category-info">
                <span className="category-icon">{item.icon}</span>
                <span className="category-name">{item.category}</span>
              </div>
              <div className="category-numbers">
                <span className="category-amount">{formatCurrency(item.amount)}</span>
                <span className="category-percentage">({item.percentage}%)</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(item.percentage, 100)}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
