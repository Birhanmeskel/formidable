import { X, Filter } from 'lucide-react';
import { SECTORS, STAGES, REGIONS, VERIFICATION_LEVELS } from '../../data/sectors';

export default function FilterPanel({ filters, onFilterChange, onClear, hasActiveFilters }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={15} style={{ color: '#1A6B3A' }} />
          <span className="text-sm font-semibold text-gray-800">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Sector */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Sector</p>
        <div className="space-y-2">
          {SECTORS.map((s) => (
            <label key={s.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="sector"
                value={s.value}
                checked={filters.sector === s.value}
                onChange={(e) => onFilterChange('sector', e.target.value)}
                className="w-3.5 h-3.5 accent-green-700"
              />
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{s.label}</span>
            </label>
          ))}
          {filters.sector && (
            <button
              onClick={() => onFilterChange('sector', '')}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Clear sector
            </button>
          )}
        </div>
      </div>

      {/* Stage */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Stage</p>
        <select
          value={filters.stage}
          onChange={(e) => onFilterChange('stage', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
        >
          <option value="">All Stages</option>
          {STAGES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Region</p>
        <select
          value={filters.region}
          onChange={(e) => onFilterChange('region', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-100"
        >
          <option value="">All Regions</option>
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Verification Level */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Min. Verification
        </p>
        <div className="space-y-2">
          {Object.entries(VERIFICATION_LEVELS).map(([lvl, info]) => (
            <label key={lvl} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="verificationLevel"
                value={lvl}
                checked={filters.verificationLevel === lvl}
                onChange={(e) => onFilterChange('verificationLevel', e.target.value)}
                className="w-3.5 h-3.5 accent-green-700"
              />
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ color: info.color, backgroundColor: info.bg }}
              >
                {info.label}
              </span>
              <span className="text-xs text-gray-400">{info.description}</span>
            </label>
          ))}
          {filters.verificationLevel && (
            <button
              onClick={() => onFilterChange('verificationLevel', '')}
              className="text-xs text-gray-400 hover:text-red-500 mt-1"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
