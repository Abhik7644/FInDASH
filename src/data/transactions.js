/**
 * data/transactions.js
 * Seed mock data for the finance dashboard.
 * In a real app this would be fetched from an API.
 */

export const SEED_TRANSACTIONS = [
  { id: 1,  date: '2026-03-01', desc: 'March Salary',        category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 2,  date: '2026-03-03', desc: 'Grocery run',          category: 'Food',          type: 'expense', amount: 3200  },
  { id: 3,  date: '2026-03-05', desc: 'Metro pass',           category: 'Transport',     type: 'expense', amount: 800   },
  { id: 4,  date: '2026-03-07', desc: 'Netflix subscription', category: 'Entertainment', type: 'expense', amount: 499   },
  { id: 5,  date: '2026-03-10', desc: 'Freelance project A',  category: 'Freelance',     type: 'income',  amount: 22000 },
  { id: 6,  date: '2026-03-12', desc: 'Amazon order',         category: 'Shopping',      type: 'expense', amount: 5400  },
  { id: 7,  date: '2026-03-14', desc: 'Electricity bill',     category: 'Utilities',     type: 'expense', amount: 1800  },
  { id: 8,  date: '2026-03-16', desc: 'Clinic visit',         category: 'Health',        type: 'expense', amount: 1200  },
  { id: 9,  date: '2026-03-18', desc: 'Dinner out',           category: 'Food',          type: 'expense', amount: 2100  },
  { id: 10, date: '2026-03-20', desc: 'Consulting fee',       category: 'Freelance',     type: 'income',  amount: 15000 },
  { id: 11, date: '2026-03-22', desc: 'Uber rides',           category: 'Transport',     type: 'expense', amount: 1400  },
  { id: 12, date: '2026-03-24', desc: 'Clothing haul',        category: 'Shopping',      type: 'expense', amount: 3800  },
  { id: 13, date: '2026-03-26', desc: 'Gym membership',       category: 'Health',        type: 'expense', amount: 2000  },
  { id: 14, date: '2026-03-28', desc: 'Internet bill',        category: 'Utilities',     type: 'expense', amount: 999   },
  { id: 15, date: '2026-02-01', desc: 'February Salary',      category: 'Salary',        type: 'income',  amount: 85000 },
  { id: 16, date: '2026-02-05', desc: 'Grocery run',          category: 'Food',          type: 'expense', amount: 2900  },
  { id: 17, date: '2026-02-10', desc: 'Freelance project B',  category: 'Freelance',     type: 'income',  amount: 18000 },
  { id: 18, date: '2026-02-14', desc: 'Valentine dinner',     category: 'Food',          type: 'expense', amount: 3500  },
  { id: 19, date: '2026-02-18', desc: 'Bus pass',             category: 'Transport',     type: 'expense', amount: 600   },
  { id: 20, date: '2026-02-22', desc: 'Electricity bill',     category: 'Utilities',     type: 'expense', amount: 1650  },
  { id: 21, date: '2026-01-01', desc: 'January Salary',       category: 'Salary',        type: 'income',  amount: 80000 },
  { id: 22, date: '2026-01-08', desc: 'New Year shopping',    category: 'Shopping',      type: 'expense', amount: 6200  },
  { id: 23, date: '2026-01-15', desc: 'Freelance gig',        category: 'Freelance',     type: 'income',  amount: 12000 },
  { id: 24, date: '2026-01-20', desc: 'Grocery run',          category: 'Food',          type: 'expense', amount: 3100  },
  { id: 25, date: '2026-01-25', desc: 'Phone repair',         category: 'Health',        type: 'expense', amount: 2500  },
];

export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Salary',
  'Entertainment', 'Health', 'Utilities', 'Freelance', 'Other',
];

export const CATEGORY_COLORS = {
  Food:          '#378ADD',
  Transport:     '#1D9E75',
  Shopping:      '#D85A30',
  Salary:        '#639922',
  Entertainment: '#D4537E',
  Health:        '#BA7517',
  Utilities:     '#7F77DD',
  Freelance:     '#E24B4A',
  Other:         '#888780',
};
