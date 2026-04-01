import { Users, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import { formatNumber, formatCurrency, formatGrowth } from '../../utils/formatters';

const MetricBox = ({ icon: Icon, label, value, color = '#1A6B3A', bg = '#F0FDF4' }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex-1 min-w-0">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: bg }}>
        <Icon size={18} style={{ color }} />
      </div>
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
    </div>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

export default function TractionMetrics({ traction }) {
  if (!traction) return null;

  return (
    <div className="flex gap-4 flex-wrap">
      <MetricBox
        icon={Users}
        label="Monthly Active Users"
        value={traction.monthlyActiveUsers > 0 ? formatNumber(traction.monthlyActiveUsers) : '—'}
        color="#1A6B3A"
        bg="#F0FDF4"
      />
      <MetricBox
        icon={DollarSign}
        label="Monthly Revenue"
        value={formatCurrency(traction.revenue.amount, traction.revenue.currency)}
        color="#D4A017"
        bg="#FFFBEB"
      />
      <MetricBox
        icon={TrendingUp}
        label="Growth Rate"
        value={formatGrowth(traction.growth)}
        color="#059669"
        bg="#ECFDF5"
      />
      <MetricBox
        icon={ShoppingBag}
        label="Customers"
        value={formatNumber(traction.customers)}
        color="#2563EB"
        bg="#EFF6FF"
      />
    </div>
  );
}
