/**
 * utils/finance.js
 * Pure helper functions for financial calculations and formatting.
 */

/** Format a number as Indian Rupee string */
export function formatINR(amount) {
  return '₹' + Math.round(Math.abs(amount)).toLocaleString('en-IN');
}

/** Get YYYY-MM month key from a date string */
export function getMonthKey(dateStr) {
  return dateStr.substring(0, 7);
}

/** Human-readable month label from YYYY-MM key */
export function monthLabel(key, format = { month: 'short', year: '2-digit' }) {
  const [y, m] = key.split('-');
  return new Date(+y, +m - 1).toLocaleDateString('en-IN', format);
}

/**
 * Aggregate transactions by month.
 * Returns { 'YYYY-MM': { income, expense } }
 */
export function aggregateByMonth(transactions) {
  return transactions.reduce((acc, t) => {
    const key = getMonthKey(t.date);
    if (!acc[key]) acc[key] = { income: 0, expense: 0 };
    acc[key][t.type] += t.amount;
    return acc;
  }, {});
}

/**
 * Aggregate expense transactions by category.
 * Returns { category: totalAmount }
 */
export function aggregateByCategory(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
}

/** Compute summary totals from a transaction array */
export function computeSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;
  const savingsRate = income > 0 ? Math.round((balance / income) * 100) : 0;
  return { income, expense, balance, savingsRate };
}

/** Build cumulative balance series from sorted month keys */
export function buildBalanceSeries(monthData, sortedKeys) {
  let running = 0;
  return sortedKeys.map(k => {
    running += monthData[k].income - monthData[k].expense;
    return Math.round(running);
  });
}
