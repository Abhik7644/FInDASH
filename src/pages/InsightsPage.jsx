/**
 * pages/InsightsPage.jsx
 * Financial insights — top category, monthly comparison, savings rate, averages.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import {
  aggregateByCategory,
  aggregateByMonth,
  computeSummary,
} from '../utils/finance';
import { formatINR } from '../utils/finance';
import InsightCard from '../components/insights/InsightCard';
import CategoryBarChart from '../components/insights/CategoryBarChart';
import Card from '../components/ui/Card';
import styles from './InsightsPage.module.css';

export default function InsightsPage() {
  const { transactions } = useApp();

  const summary  = computeSummary(transactions);
  const catData  = aggregateByCategory(transactions);
  const months   = aggregateByMonth(transactions);
  const sortedMonths = Object.keys(months).sort();

  /* Top spending category */
  const topEntry = Object.entries(catData).sort((a, b) => b[1] - a[1])[0];
  const topCat   = topEntry ? topEntry[0] : '—';
  const topVal   = topEntry ? formatINR(topEntry[1]) : '';

  /* Monthly comparison (last two months) */
  let monthComp = 'Not enough data';
  if (sortedMonths.length >= 2) {
    const prev = months[sortedMonths[sortedMonths.length - 2]];
    const curr = months[sortedMonths[sortedMonths.length - 1]];
    const diff = curr.expense - prev.expense;
    monthComp  = diff > 0
      ? `Expenses up ${formatINR(diff)} vs prior month`
      : `Expenses down ${formatINR(Math.abs(diff))} vs prior month`;
  }

  /* Average monthly expense */
  const avgMonthly = sortedMonths.length > 0
    ? formatINR(Math.round(
        transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        / sortedMonths.length
      ))
    : '₹0';

  /* Most active month */
  const busiest = sortedMonths.reduce((best, k) =>
    (months[k].income + months[k].expense) > (months[best]?.income + months[best]?.expense || 0)
      ? k : best,
    sortedMonths[0]
  );

  const INSIGHTS = [
    {
      eyebrow:     'Top spending category',
      value:       topCat,
      description: topEntry ? `${topVal} total spent` : 'No expenses yet',
      valueColor:  '#D85A30',
    },
    {
      eyebrow:     'Monthly comparison',
      value:       '',
      description: monthComp,
      valueColor:  'var(--text1)',
    },
    {
      eyebrow:     'Savings rate',
      value:       `${summary.savingsRate}%`,
      description: 'Of total income saved',
      valueColor:  '#185FA5',
    },
    {
      eyebrow:     'Avg monthly expense',
      value:       avgMonthly,
      description: `Across ${sortedMonths.length} month(s)`,
      valueColor:  'var(--text1)',
    },
    {
      eyebrow:     'Total transactions',
      value:       String(transactions.length),
      description: `${transactions.filter(t => t.type === 'income').length} income · ${transactions.filter(t => t.type === 'expense').length} expenses`,
      valueColor:  'var(--text1)',
    },
    {
      eyebrow:     'Most active month',
      value:       busiest
        ? new Date(busiest + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
        : '—',
      description: busiest
        ? `${formatINR(months[busiest].income)} in · ${formatINR(months[busiest].expense)} out`
        : '',
      valueColor:  '#7F77DD',
    },
  ];

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Insights</h1>
        <p className={styles.subtitle}>Patterns and observations from your data</p>
      </div>

      {/* Insight cards grid */}
      <div className={styles.grid}>
        {INSIGHTS.map(ins => (
          <InsightCard key={ins.eyebrow} {...ins} />
        ))}
      </div>

      {/* Category breakdown bar chart */}
      <Card title="Spending by category" subtitle="Ranked by total spend">
        <CategoryBarChart />
      </Card>
    </div>
  );
}
