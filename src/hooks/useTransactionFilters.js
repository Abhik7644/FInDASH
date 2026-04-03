/**
 * Encapsulates all filter / sort logic for the transactions list.
 */

import { useState, useMemo } from 'react';

export function useTransactionFilters(transactions) {
  const [search, setSearch]   = useState('');
  const [typeFilter, setTypeFilter]   = useState('');
  const [catFilter, setCatFilter]     = useState('');
  const [sortKey, setSortKey]    = useState('date-desc');

  const categories = useMemo(
    () => [...new Set(transactions.map(t => t.category))].sort(),
    [transactions]
  );

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (typeFilter) result = result.filter(t => t.type === typeFilter);
    if (catFilter)  result = result.filter(t => t.category === catFilter);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (sortKey) {
        case 'date-asc':    return a.date.localeCompare(b.date);
        case 'amount-desc': return b.amount - a.amount;
        case 'amount-asc':  return a.amount - b.amount;
        default:            return b.date.localeCompare(a.date);  // date-desc
      }
    });

    return result;
  }, [transactions, typeFilter, catFilter, search, sortKey]);

  return {
    search, setSearch,
    typeFilter, setTypeFilter,
    catFilter, setCatFilter,
    sortKey, setSortKey,
    categories,
    filtered,
  };
}
