/**
 * components/layout/Sidebar.jsx
 * Left navigation sidebar with role switcher and dark mode toggle.
 */

import React from 'react';
import { useApp } from '../../context/AppContext';
import Badge from '../ui/Badge';
import styles from './Sidebar.module.css';

const NAV_ITEMS = [
  { id: 'overview',     label: 'Overview',      icon: '◧' },
  { id: 'transactions', label: 'Transactions',  icon: '☰' },
  { id: 'insights',     label: 'Insights',      icon: '◈' },
];

export default function Sidebar({ activePage, onNavigate }) {
  const { role, setRole, darkMode, toggleDarkMode } = useApp();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoMark}>FD</div>
        <div>
          <div className={styles.logoText}>FinDash</div>
          <div className={styles.logoSub}>Personal Finance</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navLabel}>Menu</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`${styles.navItem} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer controls */}
      <div className={styles.footer}>
        {/* Role switcher */}
        <div className={styles.roleCard}>
          <div className={styles.roleLabel}>Active role</div>
          <select
            className={styles.roleSelect}
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <div style={{ marginTop: 8 }}>
            <Badge variant={role}>{role === 'admin' ? 'Full access' : 'View only'}</Badge>
          </div>
        </div>

        {/* Dark mode toggle */}
        <button className={styles.darkToggle} onClick={toggleDarkMode}>
          <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          <div className={`${styles.pill} ${darkMode ? styles.pillOn : ''}`}>
            <div className={styles.knob} />
          </div>
        </button>
      </div>
    </aside>
  );
}
