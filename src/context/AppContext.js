/**
 * context/AppContext.js
 * Global state: transactions, active role, dark mode.
 * Uses localStorage for persistence.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SEED_TRANSACTIONS } from '../data/transactions';

const AppContext = createContext(null);

const STORAGE_KEY = 'findash_transactions';

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (_) {}
  return JSON.parse(JSON.stringify(SEED_TRANSACTIONS));
}

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(loadTransactions);
  const [role, setRole] = useState('viewer');         // 'viewer' | 'admin'
  const [darkMode, setDarkMode] = useState(false);

  /* Persist transactions to localStorage on every change */
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)); } catch (_) {}
  }, [transactions]);

  /* Apply dark class to root */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTransaction = useCallback((txn) => {
    setTransactions(prev => {
      const nextId = Math.max(0, ...prev.map(t => t.id)) + 1;
      return [...prev, { ...txn, id: nextId }];
    });
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);

  return (
    <AppContext.Provider value={{
      transactions,
      role,
      setRole,
      darkMode,
      toggleDarkMode,
      addTransaction,
      updateTransaction,
      deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
