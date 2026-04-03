/**
 * components/ui/Card.jsx
 * Generic surface card with optional title/subtitle.
 */

import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, title, subtitle, noPad, className = '', style }) {
  return (
    <div className={`${styles.card} ${noPad ? styles.noPad : ''} ${className}`} style={style}>
      {(title || subtitle) && (
        <div className={styles.header}>
          {title    && <h3 className={styles.title}>{title}</h3>}
          {subtitle && <p  className={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
