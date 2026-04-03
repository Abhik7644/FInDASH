/**
 * components/dashboard/MonthlyBarChart.jsx
 * Simple CSS bar chart comparing monthly income vs expenses.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import { aggregateByMonth, monthLabel } from '../../utils/finance';
import styles from './MonthlyBarChart.module.css';

export default function MonthlyBarChart() {
  const { transactions } = useApp();

  const monthData  = aggregateByMonth(transactions);
  const sortedKeys = Object.keys(monthData).sort();

  const maxVal = Math.max(
    ...sortedKeys.flatMap(k => [monthData[k].income, monthData[k].expense]),
    1
  );

  return (
    <div>
      <div className={styles.bars}>
        {sortedKeys.map(key => {
          const { income, expense } = monthData[key];
          const ih = Math.round((income  / maxVal) * 74);
          const eh = Math.round((expense / maxVal) * 74);
          return (
            <div key={key} className={styles.col}>
              <div className={styles.pair}>
                <div className={styles.barInc} style={{ height: Math.max(ih, 3) }} title={`Income ₹${income.toLocaleString('en-IN')}`} />
                <div className={styles.barExp} style={{ height: Math.max(eh, 3) }} title={`Expense ₹${expense.toLocaleString('en-IN')}`} />
              </div>
              <div className={styles.label}>{monthLabel(key, { month: 'short' })}</div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <span><span className={styles.dot} style={{ background: '#378ADD' }} />Income</span>
        <span><span className={styles.dot} style={{ background: '#E24B4A' }} />Expenses</span>
      </div>
    </div>
  );
}
