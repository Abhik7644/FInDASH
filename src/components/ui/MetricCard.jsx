/**
 * components/ui/MetricCard.jsx
 * Summary KPI card with colored top accent.
 */

import React from 'react';
import styles from './MetricCard.module.css';

export default function MetricCard({ label, value, sub, accentColor, valueColor }) {
  return (
    <div className={styles.card}>
      <div className={styles.accent} style={{ background: accentColor }} />
      <div className={styles.label}>{label}</div>
      <div className={styles.value} style={{ color: valueColor }}>{value}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}
