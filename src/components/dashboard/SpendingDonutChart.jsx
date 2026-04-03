/**
 * components/dashboard/SpendingDonutChart.jsx
 * Doughnut chart showing expense split by category.
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { useApp } from '../../context/AppContext';
import { aggregateByCategory } from '../../utils/finance';
import { CATEGORY_COLORS } from '../../data/transactions';

ChartJS.register(ArcElement, Tooltip);

export default function SpendingDonutChart() {
  const { transactions, darkMode } = useApp();

  const catData = aggregateByCategory(transactions);
  const cats    = Object.keys(catData);
  const vals    = cats.map(c => catData[c]);
  const colors  = cats.map(c => CATEGORY_COLORS[c] || '#888780');
  const total   = vals.reduce((a, b) => a + b, 0);

  const chartData = {
    labels: cats,
    datasets: [{
      data:            vals,
      backgroundColor: colors,
      borderWidth:     3,
      borderColor:     darkMode ? '#1e1d1b' : '#fff',
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: {
        label: ctx => ` ${ctx.label}: ₹${ctx.parsed.toLocaleString('en-IN')}`,
      }},
    },
  };

  return (
    <div>
      <div style={{ position: 'relative', height: 160 }}>
        <Doughnut data={chartData} options={options} />
      </div>
      {/* Custom legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {cats.map((cat, i) => (
          <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text2)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: colors[i], display: 'inline-block', flexShrink: 0 }} />
            {cat} {total > 0 ? Math.round(vals[i] / total * 100) : 0}%
          </span>
        ))}
      </div>
    </div>
  );
}
