/**
 * components/layout/MobileNav.jsx
 * Bottom navigation bar shown on small screens.
 */

import React from 'react';
import styles from './MobileNav.module.css';

const ITEMS = [
  { id: 'overview',     label: 'Overview',     icon: '◧' },
  { id: 'transactions', label: 'Transactions', icon: '☰' },
  { id: 'insights',     label: 'Insights',     icon: '◈' },
];

export default function MobileNav({ activePage, onNavigate }) {
  return (
    <nav className={styles.nav}>
      {ITEMS.map(item => (
        <button
          key={item.id}
          className={`${styles.btn} ${activePage === item.id ? styles.active : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
