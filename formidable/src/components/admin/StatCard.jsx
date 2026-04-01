import { TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

export default function StatCard({ icon: Icon, label, value, trend, trendLabel, color = '#1A6B3A', bg = '#F0FDF4' }) {
  const isPositive = trend >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <Icon size={20} style={{ color }} />
        </div>
        {trend !== undefined && (
          <div
            className={clsx(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            )}
          >
            {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {trendLabel && <div className="text-xs text-gray-400 mt-1">{trendLabel}</div>}
    </div>
  );
}
