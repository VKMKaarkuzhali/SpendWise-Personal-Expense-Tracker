import React from 'react';
import { ALL_CATEGORIES } from '../data/sampleData';

/**
 * SearchFilter Component
 * Provides search query, type filter, category filter, and reset capability.
 */
const SearchFilter = ({
  searchTerm,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onResetFilters,
  resultCount,
  totalCount
}) => {
  const isFiltered =
    searchTerm !== '' || typeFilter !== 'all' || categoryFilter !== 'all';

  return (
    <div className="search-filter-card">
      <div className="filter-controls-grid">
        {/* Search Input */}
        <div className="filter-group search-input-group">
          <label htmlFor="search-input" className="filter-label">
            Search
          </label>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="search-input"
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="filter-input"
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter by Type */}
        <div className="filter-group">
          <label htmlFor="type-filter" className="filter-label">
            Type
          </label>
          <select
            id="type-filter"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="income">🟢 Income</option>
            <option value="expense">🔴 Expense</option>
          </select>
        </div>

        {/* Filter by Category */}
        <div className="filter-group">
          <label htmlFor="category-filter" className="filter-label">
            Category
          </label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="filter-group filter-actions">
          <label className="filter-label">&nbsp;</label>
          <button
            type="button"
            onClick={onResetFilters}
            disabled={!isFiltered}
            className={`btn-reset ${!isFiltered ? 'btn-disabled' : ''}`}
            title="Reset all filters and search"
          >
            ↺ Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Status Bar */}
      <div className="filter-status-bar">
        <span className="status-text">
          Showing <strong>{resultCount}</strong> of <strong>{totalCount}</strong> transactions
        </span>
        {isFiltered && (
          <span className="active-filters-pill">
            Filters Active
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
