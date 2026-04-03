/**
 * hooks/useTransactionModal.js
 * Controls open/close state and form data for the Add/Edit modal.
 */

import { useState, useCallback } from 'react';
import { CATEGORIES } from '../data/transactions';

const EMPTY_FORM = {
  desc: '',
  amount: '',
  type: 'expense',
  category: CATEGORIES[0],
  date: new Date().toISOString().split('T')[0],
};

export function useTransactionModal() {
  const [isOpen, setIsOpen]       = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]           = useState(EMPTY_FORM);

  const openAdd = useCallback(() => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((txn) => {
    setEditingId(txn.id);
    setForm({
      desc: txn.desc,
      amount: String(txn.amount),
      type: txn.type,
      category: txn.category,
      date: txn.date,
    });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingId(null);
  }, []);

  const setField = useCallback((field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  }, []);

  const isValid = () =>
    form.desc.trim() !== '' &&
    !isNaN(parseFloat(form.amount)) &&
    parseFloat(form.amount) > 0 &&
    form.date !== '';

  return { isOpen, editingId, form, setField, openAdd, openEdit, close, isValid };
}
