/**
 * components/transactions/TransactionTable.jsx
 * Renders a list of transactions in a table.
 * Admin role gets Edit / Delete action buttons.
 */

import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import { formatINR } from '../../utils/finance';
import { useApp } from '../../context/AppContext';
import styles from './TransactionTable.module.css';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  const { role } = useApp();
  const isAdmin  = role === 'admin';

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No transactions found"
        description="Try adjusting your filters or search term"
      />
    );
  }

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Type</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
            {isAdmin && <th style={{ width: 110 }} />}
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td className={styles.date}>{t.date}</td>
              <td className={styles.desc}>{t.desc}</td>
              <td><Badge variant="category">{t.category}</Badge></td>
              <td><Badge variant={t.type}>{t.type}</Badge></td>
              <td className={`${styles.amount} ${styles[t.type]}`} style={{ textAlign: 'right' }}>
                {t.type === 'income' ? '+' : '-'}{formatINR(t.amount)}
              </td>
              {isAdmin && (
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Button size="sm" onClick={() => onEdit(t)}>Edit</Button>
                  <Button size="sm" variant="danger" style={{ marginLeft: 4 }} onClick={() => onDelete(t.id)}>Del</Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
