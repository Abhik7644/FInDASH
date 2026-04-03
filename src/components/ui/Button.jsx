/**
 * components/ui/Button.jsx
 * Reusable button with variant support.
 */

import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, variant = 'default', size = 'md', onClick, type = 'button', disabled, style }) {
  const cls = [styles.btn, styles[variant], styles[size], disabled ? styles.disabled : ''].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}
