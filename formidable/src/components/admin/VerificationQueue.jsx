import { useState } from 'react';
import { Eye, Clock, AlertCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { SECTORS } from '../../data/sectors';
import { formatDate } from '../../utils/formatters';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#92400E', bg: '#FEF3C7' },
  under_review: { label: 'Under Review', color: '#1D4ED8', bg: '#DBEAFE' },
  verified: { label: 'Verified', color: '#065F46', bg: '#D1FAE5' },
  rejected: { label: 'Rejected', color: '#991B1B', bg: '#FEE2E2' },
};

export default function VerificationQueue({ startups, onReview }) {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const queue = startups.filter((s) =>
    selectedStatus === 'all'
      ? ['pending', 'under_review'].includes(s.verificationStatus)
      : s.verificationStatus === selectedStatus
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <AlertCircle size={16} style={{ color: '#D4A017' }} />
          Verification Queue
        </h3>
        <div className="flex items-center gap-2">
          {['all', 'pending', 'under_review'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                selectedStatus === s
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={selectedStatus === s ? { backgroundColor: '#1A6B3A' } : {}}
            >
              {s === 'all' ? 'All' : s === 'pending' ? 'Pending' : 'Under Review'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {queue.length === 0 ? (
        <div className="p-12 text-center text-gray-400 text-sm">
          No startups in queue.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Startup</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sector</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Founded</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {queue.map((startup) => {
                const sector = SECTORS.find((s) => s.value === startup.sector);
                const statusInfo = STATUS_CONFIG[startup.verificationStatus] || STATUS_CONFIG.pending;

                return (
                  <tr key={startup.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={startup.logo} name={startup.name} size="sm" />
                        <div>
                          <div className="font-medium text-gray-800">{startup.name}</div>
                          <div className="text-xs text-gray-400 truncate max-w-xs">
                            {startup.location.city}
                          </div>
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
                    <td className="px-4 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-gray-300" />
                        {formatDate(startup.founded)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        label={statusInfo.label}
                        color={statusInfo.color}
                        bg={statusInfo.bg}
                        size="sm"
                      />
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onReview && onReview(startup)}
                      >
                        <Eye size={13} /> Review
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
