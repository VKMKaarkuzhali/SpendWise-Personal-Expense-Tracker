import { ALL_CATEGORIES } from '../data/sampleData';

/**
 * Format numbers into Indian Rupee currency format (e.g., ₹25,000)
 */
export const formatCurrency = (amount) => {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

/**
 * Format date string (YYYY-MM-DD) into user-friendly format (e.g., 12 Sep 2026)
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

/**
 * Find icon and color associated with a category name
 */
export const getCategoryDetails = (categoryName) => {
  const found = ALL_CATEGORIES.find(
    (c) => c.name.toLowerCase() === (categoryName || '').toLowerCase()
  );
  if (found) return found;
  return { name: categoryName || 'Other', icon: '🏷️', color: '#64748b' };
};

/**
 * Calculate dynamic financial totals using ES6 reduce
 */
export const calculateTotals = (transactions = []) => {
  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

  const balance = totalIncome - totalExpenses;
  const count = transactions.length;

  return {
    totalIncome,
    totalExpenses,
    balance,
    count
  };
};

/**
 * Aggregate category-wise expenses with amounts and percentages
 */
export const getCategorySummary = (transactions = [], type = 'expense') => {
  const targetTransactions = transactions.filter((tx) => tx.type === type);
  const totalAmount = targetTransactions.reduce(
    (sum, tx) => sum + Number(tx.amount || 0),
    0
  );

  // Group by category
  const categoryMap = {};
  targetTransactions.forEach((tx) => {
    const cat = tx.category || 'Other';
    if (!categoryMap[cat]) {
      categoryMap[cat] = 0;
    }
    categoryMap[cat] += Number(tx.amount || 0);
  });

  // Convert to array and calculate percentage
  const summary = Object.keys(categoryMap).map((category) => {
    const amount = categoryMap[category];
    const percentage = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(1) : 0;
    const details = getCategoryDetails(category);

    return {
      category,
      amount,
      percentage: Number(percentage),
      icon: details.icon,
      color: details.color
    };
  });

  // Sort descending by amount
  return summary.sort((a, b) => b.amount - a.amount);
};

/**
 * Group transactions by month for trend analysis
 */
export const getMonthlySummary = (transactions = []) => {
  const monthlyMap = {};

  transactions.forEach((tx) => {
    if (!tx.date) return;
    const [year, month] = tx.date.split('-');
    const key = `${year}-${month}`;

    if (!monthlyMap[key]) {
      const dateObj = new Date(Number(year), Number(month) - 1, 1);
      const label = dateObj.toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric'
      });
      monthlyMap[key] = {
        key,
        label,
        income: 0,
        expense: 0
      };
    }

    if (tx.type === 'income') {
      monthlyMap[key].income += Number(tx.amount || 0);
    } else {
      monthlyMap[key].expense += Number(tx.amount || 0);
    }
  });

  // Sort chronologically
  return Object.values(monthlyMap).sort((a, b) => a.key.localeCompare(b.key));
};
