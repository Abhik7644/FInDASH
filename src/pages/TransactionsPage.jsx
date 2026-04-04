/**
 * pages/TransactionsPage.jsx
 * Full transaction list with filters, sorting, and admin actions.
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import { useTransactionModal } from '../hooks/useTransactionModal';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionModal from '../components/transactions/TransactionModal';
import styles from './TransactionsPage.module.css';

export default function TransactionsPage() {
  const { transactions, role, addTransaction, updateTransaction, deleteTransaction } = useApp();

  const filters   = useTransactionFilters(transactions);
  const modal     = useTransactionModal();
  const isAdmin   = role === 'admin';

  function handleSave(data) {
    if (modal.editingId) {
      updateTransaction(modal.editingId, data);
    } else {
      addTransaction(data);
    }
  }

  function handleEdit(txn) {
    modal.openEdit(txn);
  }

  function handleDelete(id) {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Transactions</h1>
          <p className={styles.subtitle}>All your financial activity</p>
        </div>
        {isAdmin && (
          <Button variant="primary" onClick={modal.openAdd}>
            + Add transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <TransactionFilters filters={filters} categories={filters.categories} />

      {/* Table */}
      <Card noPad>
        <TransactionTable
          transactions={filters.filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>

      {/* Add / Edit modal — admin only */}
      {isAdmin && (
        <TransactionModal modalState={modal} onSave={handleSave} />
      )}
    </div>
  );
}
