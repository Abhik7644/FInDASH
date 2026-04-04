/**
 * App.jsx
 * Root component — layout shell + simple client-side "routing" via state.
 */

import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import MobileNav from './components/layout/MobileNav';
import OverviewPage from './pages/OverviewPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import styles from './App.module.css';

const PAGES = {
  overview:     <OverviewPage />,
  transactions: <TransactionsPage />,
  insights:     <InsightsPage />,
};

function Layout() {
  const [activePage, setActivePage] = useState('overview');

  return (
    <div className={styles.shell}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className={styles.main}>
        {PAGES[activePage]}
      </main>

      <MobileNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
