import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Build cumulative funding data from all startups
function buildCumulativeData(startups) {
  const events = [];
  startups.forEach((s) => {
    s.funding.fundingHistory.forEach((h) => {
      if (h.date) {
        events.push({ date: h.date, amount: h.amount });
      }
    });
  });

  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  let cumulative = 0;
  const byQuarter = {};

  events.forEach((e) => {
    const d = new Date(e.date);
    const q = `${d.getFullYear()} Q${Math.ceil((d.getMonth() + 1) / 3)}`;
    byQuarter[q] = (byQuarter[q] || 0) + e.amount;
  });

  const result = [];
  Object.entries(byQuarter).forEach(([quarter, amount]) => {
    cumulative += amount;
    result.push({ quarter, amount: Math.round(cumulative / 1000) });
  });

  return result;
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3">
        <p className="text-xs font-semibold text-gray-500 mb-1">{label}</p>
        <p className="text-sm font-bold text-green-700">
          ${(payload[0].value / 1000).toFixed(1)}M cumulative
        </p>
      </div>
    );
  }
  return null;
};

export default function FundingAreaChart({ startups }) {
  const data = buildCumulativeData(startups);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">Cumulative Funding Over Time</h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1A6B3A" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1A6B3A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            angle={-40}
            textAnchor="end"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            tickFormatter={(v) => `$${v}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#1A6B3A"
            strokeWidth={2}
            fill="url(#fundingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
