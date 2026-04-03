/**
 * components/dashboard/BalanceTrendChart.jsx
 * Line chart showing cumulative balance over months.
 */

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, LineElement, PointElement,
  LinearScale, CategoryScale, Filler, Tooltip,
} from 'chart.js';
import { useApp } from '../../context/AppContext';
import { aggregateByMonth, buildBalanceSeries, monthLabel } from '../../utils/finance';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

export default function BalanceTrendChart() {
  const { transactions, darkMode } = useApp();

  const monthData   = aggregateByMonth(transactions);
  const sortedKeys  = Object.keys(monthData).sort();
  const labels      = sortedKeys.map(k => monthLabel(k));
  const data        = buildBalanceSeries(monthData, sortedKeys);

  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const tickColor = darkMode ? '#5c5b58' : '#a09f9c';

  const chartData = {
    labels,
    datasets: [{
      data,
      borderColor:     '#378ADD',
      backgroundColor: darkMode ? 'rgba(55,138,221,0.12)' : 'rgba(55,138,221,0.08)',
      fill:       true,
      tension:    0.35,
      pointRadius:      5,
      pointBackgroundColor: '#378ADD',
      pointBorderColor:     darkMode ? '#1e1d1b' : '#fff',
      pointBorderWidth:     2,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { callbacks: {
      label: ctx => ' ₹' + ctx.parsed.y.toLocaleString('en-IN'),
    }}},
    scales: {
      y: {
        ticks: { callback: v => '₹' + (v / 1000).toFixed(0) + 'k', color: tickColor, font: { size: 11 } },
        grid:  { color: gridColor },
        border: { display: false },
      },
      x: {
        ticks: { color: tickColor, font: { size: 11 }, maxRotation: 0 },
        grid:  { display: false },
        border: { display: false },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: 200 }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
