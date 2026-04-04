# FinDash — Finance Dashboard UI

A clean, interactive personal finance dashboard built with **React**

---

## Live Features

| Feature            | Details                                                                              |
| ------------------ | ------------------------------------------------------------------------------------ |
| Dashboard overview | Summary KPI cards, balance trend line chart, spending donut chart, monthly bar chart |
| Transactions       | Filterable, sortable list with search by name/category                               |
| Insights           | Top spending category, monthly comparison, savings rate, avg expense, busiest month  |
| Role-based UI      | Viewer (read-only) · Admin (add, edit, delete transactions) via dropdown             |
| Dark mode          | Full dark/light theme toggle, persisted in-session                                   |
| Data persistence   | All transaction changes saved to `localStorage`                                      |

---

## Tech Stack

- **React 18** — component-based UI
- **Chart.js + react-chartjs-2** — line chart and doughnut chart
- **CSS Modules** — scoped, maintainable styles per component
- **Context API** — global state (transactions, role, dark mode)
- **Custom hooks** — filter logic and modal state extracted into reusable hooks
- **localStorage** — client-side data persistence without a backend

---

## Project Structure

```
src/
├── data/
│   └── transactions.js          # Seed mock data + category colors
├── utils/
│   └── finance.js               # Pure financial helpers (formatINR, aggregations)
├── context/
│   └── AppContext.js            # Global state provider (transactions, role, dark mode)
├── hooks/
│   ├── useTransactionFilters.js # Filter + sort logic for transactions list
│   └── useTransactionModal.js   # Form state + open/close for add/edit modal
├── components/
│   ├── ui/                      # Reusable primitives
│   │   ├── Button.jsx / .module.css
│   │   ├── Badge.jsx / .module.css
│   │   ├── Card.jsx / .module.css
│   │   ├── MetricCard.jsx / .module.css
│   │   ├── Modal.jsx / .module.css
│   │   └── EmptyState.jsx / .module.css
│   ├── layout/                  # App shell components
│   │   ├── Sidebar.jsx / .module.css
│   │   └── MobileNav.jsx / .module.css
│   ├── dashboard/               # Overview page charts
│   │   ├── BalanceTrendChart.jsx
│   │   ├── SpendingDonutChart.jsx
│   │   └── MonthlyBarChart.jsx / .module.css
│   ├── transactions/            # Transactions page components
│   │   ├── TransactionFilters.jsx / .module.css
│   │   ├── TransactionTable.jsx / .module.css
│   │   └── TransactionModal.jsx / .module.css
│   └── insights/                # Insights page components
│       ├── InsightCard.jsx / .module.css
│       └── CategoryBarChart.jsx / .module.css
├── pages/
│   ├── OverviewPage.jsx / .module.css
│   ├── TransactionsPage.jsx / .module.css
│   └── InsightsPage.jsx / .module.css
├── App.jsx / App.module.css     # Root layout + page routing
├── index.js                     # React entry point
└── index.css                    # Global CSS variables (light + dark tokens)
```

---

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# Opens at http://localhost:3000
```

### Build for Production

```bash
npm run build
```

---

## Role-Based UI

Switch roles using the dropdown in the sidebar:

| Role       | Behaviour                                                                       |
| ---------- | ------------------------------------------------------------------------------- |
| **Viewer** | Can browse all data — overview, transactions, insights. No edit controls shown. |
| **Admin**  | Full access — can add, edit, and delete transactions via the modal form.        |

This is a simulated frontend-only RBAC. No authentication backend is required.

---

## Assumptions & Design Decisions

- **No router library** — simple `useState` navigation keeps the bundle lean for a single-page dashboard.
- **CSS Modules** — chosen over Tailwind to show understanding of component-scoped styling.
- **Mock data** — 25 seed transactions across Jan–Mar 2026 to demonstrate all chart scenarios.
- **localStorage** — provides basic persistence without requiring a backend or mock API setup.
- **Indian locale (₹, en-IN)** — amounts formatted with `toLocaleString('en-IN')` for relevant regional context.

---

## Screenshots

| Overview (Light)        | Overview (Dark)        |
| ----------------------- | ---------------------- |
| _(run locally to view)_ | _(toggle via sidebar)_ |

---
