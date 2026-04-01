import { useState } from 'react';
import { X, CheckCircle2, XCircle, Clock, ShieldCheck } from 'lucide-react';
import { STARTUPS } from '../../data/startups';
import VerificationQueue from '../../components/admin/VerificationQueue';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import { VERIFICATION_LEVELS } from '../../data/sectors';

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#92400E', bg: '#FEF3C7' },
  under_review: { label: 'Under Review', color: '#1D4ED8', bg: '#DBEAFE' },
  verified: { label: 'Verified', color: '#065F46', bg: '#D1FAE5' },
  rejected: { label: 'Rejected', color: '#991B1B', bg: '#FEE2E2' },
};

function ReviewModal({ startup, onClose }) {
  const [level, setLevel] = useState(startup.verificationLevel);
  const [status, setStatus] = useState(startup.verificationStatus);
  const [note, setNote] = useState('');

  if (!startup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Review Startup</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
          <Avatar src={startup.logo} name={startup.name} size="md" />
          <div>
            <div className="font-semibold text-gray-800">{startup.name}</div>
            <div className="text-sm text-gray-500">{startup.tagline}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Verification Level</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(VERIFICATION_LEVELS).map(([lvl, info]) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(Number(lvl))}
                  className={`p-2.5 rounded-lg border text-left transition-colors ${
                    level === Number(lvl) ? 'border-green-500' : 'border-gray-200'
                  }`}
                  style={level === Number(lvl) ? { backgroundColor: info.bg } : {}}
                >
                  <span className="text-xs font-semibold" style={{ color: info.color }}>
                    Level {lvl}: {info.label}
                  </span>
                  <div className="text-xs text-gray-400">{info.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STATUS_CONFIG).map(([s, info]) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    status === s ? 'border-transparent' : 'border-gray-200 bg-white'
                  }`}
                  style={status === s ? { color: info.color, backgroundColor: info.bg } : {}}
                >
                  {info.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Review Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this verification decision..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={onClose} className="flex-1">
            <ShieldCheck size={15} /> Save Decision
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Verification() {
  const [reviewing, setReviewing] = useState(null);

  const stats = [
    {
      label: 'Pending',
      count: STARTUPS.filter((s) => s.verificationStatus === 'pending').length,
      color: '#92400E',
      bg: '#FEF3C7',
      icon: Clock,
    },
    {
      label: 'Under Review',
      count: STARTUPS.filter((s) => s.verificationStatus === 'under_review').length,
      color: '#1D4ED8',
      bg: '#DBEAFE',
      icon: ShieldCheck,
    },
    {
      label: 'Verified',
      count: STARTUPS.filter((s) => s.verificationStatus === 'verified').length,
      color: '#065F46',
      bg: '#D1FAE5',
      icon: CheckCircle2,
    },
    {
      label: 'Rejected',
      count: STARTUPS.filter((s) => s.verificationStatus === 'rejected').length,
      color: '#991B1B',
      bg: '#FEE2E2',
      icon: XCircle,
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Verification Management</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and verify startup submissions across the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, count, color, bg, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: bg }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{count}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <VerificationQueue startups={STARTUPS} onReview={setReviewing} />

      {reviewing && (
        <ReviewModal startup={reviewing} onClose={() => setReviewing(null)} />
      )}
    </div>
  );
}
