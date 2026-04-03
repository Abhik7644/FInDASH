/**
 * pages/OverviewPage.jsx
 * Main dashboard view — summary cards + charts.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { computeSummary } from '../utils/finance';
import { formatINR } from '../utils/finance';
import MetricCard from '../components/ui/MetricCard';
import Card from '../components/ui/Card';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingDonutChart from '../components/dashboard/SpendingDonutChart';
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart';
import styles from './OverviewPage.module.css';

const METRIC_CONFIGS = (summary) => [
  {
    label:       'Total balance',
    value:       formatINR(summary.balance),
    sub:         'All-time net',
    valueColor:  '#185FA5',
    accentColor: 'linear-gradient(90deg, #185FA5, #378ADD)',
  },
  {
    label:       'Total income',
    value:       formatINR(summary.income),
    sub:         'All-time earned',
    valueColor:  '#3B6D11',
    accentColor: 'linear-gradient(90deg, #3B6D11, #97C459)',
  },
  {
    label:       'Total expenses',
    value:       formatINR(summary.expense),
    sub:         'All-time spent',
    valueColor:  '#A32D2D',
    accentColor: 'linear-gradient(90deg, #A32D2D, #E24B4A)',
  },
  {
    label:       'Savings rate',
    value:       `${summary.savingsRate}%`,
    sub:         'Of income saved',
    valueColor:  '#854F0B',
    accentColor: 'linear-gradient(90deg, #854F0B, #EF9F27)',
  },
];

export default function OverviewPage() {
  const { transactions } = useApp();
  const summary = computeSummary(transactions);

  return (
    <div className={styles.page}>
      {/* Page header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Overview</h1>
        <p className={styles.subtitle}>Your financial summary at a glance</p>
      </div>

      {/* KPI cards */}
      <div className={styles.metricsGrid}>
        {METRIC_CONFIGS(summary).map(m => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.chartsRow}>
        <Card title="Balance trend" subtitle="Cumulative net over time">
          <BalanceTrendChart />
        </Card>

        <Card title="Spending breakdown" subtitle="By category">
          <SpendingDonutChart />
        </Card>
      </div>

      {/* Monthly bar chart */}
      <Card title="Monthly income vs expenses">
        <MonthlyBarChart />
      </Card>
    </div>
  );
}
