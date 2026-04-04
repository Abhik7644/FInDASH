/**
 * components/transactions/TransactionModal.jsx
 * Form modal for adding or editing a transaction.
 * Only accessible to Admin role.
 */

import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { CATEGORIES } from '../../data/transactions';
import styles from './TransactionModal.module.css';

export default function TransactionModal({ modalState, onSave }) {
  const { isOpen, editingId, form, setField, close, isValid } = modalState;

  function handleSave() {
    if (!isValid()) return;
    onSave({
      desc:     form.desc.trim(),
      amount:   parseFloat(form.amount),
      type:     form.type,
      category: form.category,
      date:     form.date,
    });
    close();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title={editingId ? 'Edit transaction' : 'Add transaction'}
    >
      <div className={styles.form}>
        {/* Description */}
        <div className={styles.row}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Grocery shopping"
            value={form.desc}
            onChange={e => setField('desc', e.target.value)}
          />
        </div>

        {/* Amount + Date side by side */}
        <div className={styles.twoCol}>
          <div className={styles.row}>
            <label className={styles.label}>Amount (₹)</label>
            <input
              className={styles.input}
              type="number"
              placeholder="0"
              min="0"
              value={form.amount}
              onChange={e => setField('amount', e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Date</label>
            <input
              className={styles.input}
              type="date"
              value={form.date}
              onChange={e => setField('date', e.target.value)}
            />
          </div>
        </div>

        {/* Type + Category side by side */}
        <div className={styles.twoCol}>
          <div className={styles.row}>
            <label className={styles.label}>Type</label>
            <select className={styles.input} value={form.type} onChange={e => setField('type', e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className={styles.row}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} value={form.category} onChange={e => setField('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button variant="ghost" onClick={close}>Cancel</Button>
          <Button variant="primary" onClick={handleSave} disabled={!isValid()}>
            Save transaction
          </Button>
        </div>
      </div>
    </Modal>
  );
}
