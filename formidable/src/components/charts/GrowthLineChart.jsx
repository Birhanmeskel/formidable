import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Generate quarterly ecosystem growth from founding dates
function buildGrowthData(startups) {
  const quarters = {};

  startups.forEach((s) => {
    if (!s.founded) return;
    const d = new Date(s.founded);
    const q = `${d.getFullYear()} Q${Math.ceil((d.getMonth() + 1) / 3)}`;
    quarters[q] = (quarters[q] || 0) + 1;
  });

  const sorted = Object.entries(quarters).sort(([a], [b]) => {
    const [ay, aq] = a.split(' Q');
    const [by, bq] = b.split(' Q');
    return ay !== by ? Number(ay) - Number(by) : Number(aq) - Number(bq);
  });

  let cumulative = 0;
  return sorted.map(([quarter, newStartups]) => {
    cumulative += newStartups;
    return { quarter, newStartups, total: cumulative };
  });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3 space-y-1">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-sm font-medium" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GrowthLineChart({ startups }) {
  const data = buildGrowthData(startups);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">Ecosystem Growth by Quarter</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="quarter"
            tick={{ fontSize: 10, fill: '#9CA3AF' }}
            angle={-40}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(v) => <span className="text-xs text-gray-600">{v}</span>} />
          <Line
            type="monotone"
            dataKey="total"
            name="Total Startups"
            stroke="#1A6B3A"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#1A6B3A' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="newStartups"
            name="New This Quarter"
            stroke="#D4A017"
            strokeWidth={2}
            strokeDasharray="5 3"
            dot={{ r: 3, fill: '#D4A017' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
