import { createContext, useContext, useState } from 'react';

const FilterContext = createContext(null);

const defaultFilters = {
  search: '',
  sector: '',
  stage: '',
  region: '',
  verificationLevel: '',
  sortBy: 'name_asc',
};

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState(defaultFilters);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, val]) => key !== 'sortBy' && val !== ''
  );

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters, hasActiveFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
}
