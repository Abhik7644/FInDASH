/**
 * components/insights/InsightCard.jsx
 * Single insight data card.
 */

import React from 'react';
import styles from './InsightCard.module.css';

export default function InsightCard({ eyebrow, value, description, valueColor }) {
  return (
    <div className={styles.card}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <div className={styles.value} style={{ color: valueColor || 'var(--text1)' }}>{value}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  );
}
