/**
 * components/ui/EmptyState.jsx
 * Displayed when a list has no items to show.
 */

import React from 'react';
import styles from './EmptyState.module.css';

export default function EmptyState({ icon = '🔍', title = 'No data', description }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      {description && <div className={styles.desc}>{description}</div>}
    </div>
  );
}
