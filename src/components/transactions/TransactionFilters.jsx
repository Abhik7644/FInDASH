/**
 * components/transactions/TransactionFilters.jsx
 * Search + filter controls for the transactions list.
 */

import React from 'react';
import styles from './TransactionFilters.module.css';

export default function TransactionFilters({ filters, categories }) {
  const { search, setSearch, typeFilter, setTypeFilter, catFilter, setCatFilter, sortKey, setSortKey } = filters;

  return (
    <div className={styles.row}>
      <input
        type="text"
        className={styles.search}
        placeholder="Search by name or category..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <select className={styles.select} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select className={styles.select} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
        <option value="">All categories</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select className={styles.select} value={sortKey} onChange={e => setSortKey(e.target.value)}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="amount-desc">Highest amount</option>
        <option value="amount-asc">Lowest amount</option>
      </select>
    </div>
  );
}
