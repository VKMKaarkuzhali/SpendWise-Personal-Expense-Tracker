import React, { useState, useEffect } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../data/sampleData';

/**
 * TransactionForm Component
 * Handles creating new transactions and editing existing transactions.
 * Includes complete client-side validation with real-time error states.
 */
const TransactionForm = ({
  onAddTransaction,
  onUpdateTransaction,
  editingTransaction,
  onCancelEdit
}) => {
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  // Validation Errors State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sync form data when an item is selected for editing
  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title || '',
        amount: editingTransaction.amount || '',
        type: editingTransaction.type || 'expense',
        category: editingTransaction.category || '',
        date: editingTransaction.date || new Date().toISOString().split('T')[0],
        description: editingTransaction.description || ''
      });
      setErrors({});
      setTouched({});
    } else {
      // Reset form to default
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setErrors({});
      setTouched({});
    }
  }, [editingTransaction]);

  // Determine available categories based on selected transaction type
  const availableCategories =
    formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Handle generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // If changing type, reset category if not valid for that type
      let updatedCategory = prev.category;
      if (name === 'type') {
        updatedCategory = '';
      }
      return {
        ...prev,
        [name]: value,
        ...(name === 'type' ? { category: updatedCategory } : {})
      };
    });

    // Clear error for this field if user modifies it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Mark field as touched on blur to trigger validation feedback
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Individual field validation
  const validateField = (fieldName, value) => {
    let error = null;

    if (fieldName === 'title') {
      if (!value || !value.trim()) {
        error = 'Title is required and cannot be empty.';
      } else if (value.trim().length < 2) {
        error = 'Title must be at least 2 characters long.';
      }
    }

    if (fieldName === 'amount') {
      if (value === '' || value === null || value === undefined) {
        error = 'Amount is required.';
      } else if (isNaN(Number(value)) || Number(value) <= 0) {
        error = 'Amount must be a number greater than 0.';
      }
    }

    if (fieldName === 'category') {
      if (!value || !value.trim()) {
        error = 'Please select a valid category.';
      }
    }

    if (fieldName === 'date') {
      if (!value) {
        error = 'Transaction date is required.';
      }
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error
    }));

    return error === null;
  };

  // Complete form validation before submission
  const validateAll = () => {
    const titleValid = validateField('title', formData.title);
    const amountValid = validateField('amount', formData.amount);
    const categoryValid = validateField('category', formData.category);
    const dateValid = validateField('date', formData.date);

    setTouched({
      title: true,
      amount: true,
      category: true,
      date: true,
      description: true
    });

    return titleValid && amountValid && categoryValid && dateValid;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) {
      return; // Stop submission if invalid
    }

    const payload = {
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      date: formData.date,
      description: formData.description.trim()
    };

    if (editingTransaction) {
      // Edit existing transaction
      onUpdateTransaction({
        ...payload,
        id: editingTransaction.id
      });
    } else {
      // Add new transaction with unique timestamp id
      onAddTransaction({
        ...payload,
        id: 'tx-' + Date.now()
      });

      // Reset form after adding
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      setTouched({});
      setErrors({});
    }
  };

  return (
    <div className={`transaction-form-card ${editingTransaction ? 'is-editing' : ''}`}>
      <div className="form-header">
        <div className="form-header-title">
          <span className="form-header-icon">{editingTransaction ? '✏️' : '➕'}</span>
          <h3>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h3>
        </div>
        {editingTransaction && (
          <span className="editing-badge">Editing Mode</span>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="transaction-form">
        {/* Type Selector (Radio Buttons or Toggle Pills) */}
        <div className="form-group">
          <label className="form-label">Transaction Type</label>
          <div className="type-toggle-group">
            <button
              type="button"
              className={`type-btn expense-btn ${formData.type === 'expense' ? 'selected' : ''}`}
              onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
            >
              <span>🔻</span> Expense
            </button>
            <button
              type="button"
              className={`type-btn income-btn ${formData.type === 'income' ? 'selected' : ''}`}
              onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
            >
              <span>🔺</span> Income
            </button>
          </div>
        </div>

        {/* Title Field */}
        <div className="form-group">
          <label htmlFor="tx-title" className="form-label">
            Title / Note <span className="required-star">*</span>
          </label>
          <input
            id="tx-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Grocery store, Salary deposit"
            className={`form-input ${touched.title && errors.title ? 'input-error' : ''}`}
          />
          {touched.title && errors.title && (
            <span className="error-message">⚠️ {errors.title}</span>
          )}
        </div>

        {/* Grid for Amount and Date */}
        <div className="form-row-2">
          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="tx-amount" className="form-label">
              Amount (₹) <span className="required-star">*</span>
            </label>
            <div className="amount-input-wrapper">
              <span className="currency-prefix">₹</span>
              <input
                id="tx-amount"
                type="number"
                step="any"
                min="0.01"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0.00"
                className={`form-input input-with-prefix ${touched.amount && errors.amount ? 'input-error' : ''}`}
              />
            </div>
            {touched.amount && errors.amount && (
              <span className="error-message">⚠️ {errors.amount}</span>
            )}
          </div>

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="tx-date" className="form-label">
              Date <span className="required-star">*</span>
            </label>
            <input
              id="tx-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${touched.date && errors.date ? 'input-error' : ''}`}
            />
            {touched.date && errors.date && (
              <span className="error-message">⚠️ {errors.date}</span>
            )}
          </div>
        </div>

        {/* Category Field */}
        <div className="form-group">
          <label htmlFor="tx-category" className="form-label">
            Category <span className="required-star">*</span>
          </label>
          <select
            id="tx-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-select ${touched.category && errors.category ? 'input-error' : ''}`}
          >
            <option value="">-- Select {formData.type === 'income' ? 'Income' : 'Expense'} Category --</option>
            {availableCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span className="error-message">⚠️ {errors.category}</span>
          )}
        </div>

        {/* Optional Description */}
        <div className="form-group">
          <label htmlFor="tx-desc" className="form-label">
            Description / Notes <span className="optional-tag">(Optional)</span>
          </label>
          <textarea
            id="tx-desc"
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add additional details or remarks..."
            className="form-textarea"
          ></textarea>
        </div>

        {/* Form Action Buttons */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTransaction ? '✓ Update Transaction' : '+ Add Transaction'}
          </button>

          {editingTransaction && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn btn-secondary"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
