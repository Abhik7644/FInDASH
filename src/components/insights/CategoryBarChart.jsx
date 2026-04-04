/**
 * components/insights/CategoryBarChart.jsx
 * Horizontal bar chart ranking spending by category.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { aggregateByCategory } from '../../utils/finance';
import { CATEGORY_COLORS } from '../../data/transactions';
import { formatINR } from '../../utils/finance';
import styles from './CategoryBarChart.module.css';

export default function CategoryBarChart() {
  const { transactions } = useApp();

  const catData    = aggregateByCategory(transactions);
  const sorted     = Object.entries(catData).sort((a, b) => b[1] - a[1]);
  const maxVal     = sorted.length > 0 ? sorted[0][1] : 1;

  if (sorted.length === 0) {
    return <p style={{ color: 'var(--text3)', fontSize: 13 }}>No expense data available.</p>;
  }

  return (
    <div className={styles.wrap}>
      {sorted.map(([cat, val]) => (
        <div key={cat} className={styles.row}>
          <div className={styles.label}>{cat}</div>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{
                width:      `${Math.round(val / maxVal * 100)}%`,
                background: CATEGORY_COLORS[cat] || '#888780',
              }}
            />
          </div>
          <div className={styles.val}>{formatINR(val)}</div>
        </div>
      ))}
    </div>
  );
}
