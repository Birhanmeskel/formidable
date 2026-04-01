import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { STARTUPS } from '../data/startups';
import { useFilters } from '../context/FilterContext';
import { useFilter } from '../hooks/useFilter';
import StartupCard from '../components/startup/StartupCard';
import FilterPanel from '../components/directory/FilterPanel';
import SearchBar from '../components/directory/SearchBar';
import ViewToggle from '../components/directory/ViewToggle';
import Select from '../components/ui/Select';
import EmptyState from '../components/ui/EmptyState';
import { Search } from 'lucide-react';

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name A–Z' },
  { value: 'name_desc', label: 'Name Z–A' },
  { value: 'founded_new', label: 'Newest First' },
  { value: 'founded_old', label: 'Oldest First' },
  { value: 'funding_high', label: 'Most Funded' },
  { value: 'employees_high', label: 'Most Employees' },
  { value: 'mau_high', label: 'Highest MAU' },
];

export default function Directory() {
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useFilters();
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useFilter(STARTUPS, filters);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (key, value) => {
    updateFilter(key, value);
    setPage(1);
  };

  const handleClear = () => {
    clearFilters();
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Directory</h1>
          <p className="text-gray-500 text-base">
            Discover and explore Ethiopia's startup ecosystem — {STARTUPS.length} startups across 8 sectors.
          </p>
          {hasActiveFilters && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Showing <strong className="text-gray-800">{filtered.length}</strong> of{' '}
                {STARTUPS.length} startups
              </span>
              <button
                onClick={handleClear}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 font-medium"
              >
                <X size={12} /> Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-7">
          {/* Sidebar filter — desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClear}
                hasActiveFilters={hasActiveFilters}
              />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <SearchBar
                  value={filters.search}
                  onChange={(v) => handleFilterChange('search', v)}
                />
              </div>

              {/* Mobile filter toggle */}
              <button
                className="lg:hidden flex items-center gap-1.5 px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setMobileFilterOpen(true)}
              >
                <SlidersHorizontal size={15} /> Filters
                {hasActiveFilters && (
                  <span
                    className="w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                    style={{ backgroundColor: '#1A6B3A' }}
                  >
                    •
                  </span>
                )}
              </button>

              <div className="w-40">
                <Select
                  options={SORT_OPTIONS}
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  placeholder="Sort by..."
                />
              </div>
              <ViewToggle view={view} onChange={setView} />
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-500 mb-5">
              {filtered.length === 0
                ? 'No startups found'
                : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length} startups`}
            </p>

            {/* Grid/List */}
            {paginated.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No startups found"
                description="Try adjusting your search or filters to find what you're looking for."
                action={
                  <button
                    onClick={handleClear}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: '#1A6B3A' }}
                  >
                    Clear all filters
                  </button>
                }
              />
            ) : (
              <div
                className={
                  view === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                    : 'space-y-3'
                }
              >
                {paginated.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} view={view} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      p === page
                        ? 'text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    style={p === page ? { backgroundColor: '#1A6B3A' } : {}}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-50 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-gray-800">Filters</span>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClear}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}
