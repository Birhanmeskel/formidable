import { useState } from 'react';
import { Search, Edit2, Trash2, ToggleLeft, ToggleRight, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { STARTUPS } from '../../data/startups';
import { SECTORS, STAGES } from '../../data/sectors';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#92400E', bg: '#FEF3C7' },
  under_review: { label: 'Under Review', color: '#1D4ED8', bg: '#DBEAFE' },
  verified: { label: 'Verified', color: '#065F46', bg: '#D1FAE5' },
  rejected: { label: 'Rejected', color: '#991B1B', bg: '#FEE2E2' },
};

const PAGE_SIZE = 10;

export default function ManageStartups() {
  const [startups, setStartups] = useState(STARTUPS);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = startups.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.city.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleActive = (id) => {
    setStartups((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this startup?')) {
      setStartups((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Startups</h1>
          <p className="text-sm text-gray-500 mt-1">{startups.length} startups in the database</p>
        </div>
        <Button variant="primary" size="sm">
          <Plus size={15} /> Add Startup
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search startups..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-100 bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Startup</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sector</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stage</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Active</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginated.map((startup) => {
                const sector = SECTORS.find((s) => s.value === startup.sector);
                const stage = STAGES.find((s) => s.value === startup.stage);
                const statusInfo = STATUS_CONFIG[startup.verificationStatus] || STATUS_CONFIG.pending;

                return (
                  <tr key={startup.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={startup.logo} name={startup.name} size="sm" />
                        <div>
                          <div className="font-medium text-gray-800 text-sm">{startup.name}</div>
                          <div className="text-xs text-gray-400">{startup.location.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {sector && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ color: sector.color, backgroundColor: sector.color + '18' }}
                        >
                          {sector.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {stage && (
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ color: stage.color, backgroundColor: stage.color + '18' }}
                        >
                          {stage.label}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        label={statusInfo.label}
                        color={statusInfo.color}
                        bg={statusInfo.bg}
                        size="sm"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleActive(startup.id)}
                        className="transition-colors"
                        style={{ color: startup.isActive ? '#1A6B3A' : '#9CA3AF' }}
                        title={startup.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {startup.isActive
                          ? <ToggleRight size={24} />
                          : <ToggleLeft size={24} />
                        }
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(startup.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-400">
                    No startups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-50">
            <span className="text-xs text-gray-500">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-medium text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
