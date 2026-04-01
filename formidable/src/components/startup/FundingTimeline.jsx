import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#94A3B8', '#D4A017', '#1A6B3A', '#0F1923', '#7C3AED', '#059669'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3">
        <p className="text-xs font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-sm font-bold" style={{ color: '#1A6B3A' }}>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function FundingTimeline({ fundingHistory = [] }) {
  if (!fundingHistory || fundingHistory.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center text-sm text-gray-400">
        No funding history available.
      </div>
    );
  }

  const data = fundingHistory.map((h, i) => ({
    round: h.round,
    amount: h.amount,
    currency: h.currency,
    date: h.date ? new Date(h.date).getFullYear() : '',
    index: i,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-5">Funding Rounds</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis dataKey="round" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickFormatter={(v) => (v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${v / 1000}K`)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Round list */}
      <div className="mt-4 space-y-2">
        {data.map((h, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="font-medium text-gray-700">{h.round}</span>
              <span className="text-gray-400 text-xs">{h.date}</span>
            </div>
            <span className="font-semibold text-gray-800">
              ${h.amount >= 1_000_000
                ? `${(h.amount / 1_000_000).toFixed(1)}M`
                : `${(h.amount / 1_000).toFixed(0)}K`}{' '}
              {h.currency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
