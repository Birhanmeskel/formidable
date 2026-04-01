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
import { STAGES } from '../../data/sectors';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-3">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-gray-600">{payload[0].value} startups</p>
      </div>
    );
  }
  return null;
};

export default function StageBarChart({ startups }) {
  const data = STAGES.map((s) => ({
    name: s.label,
    value: startups.filter((st) => st.stage === s.value).length,
    color: s.color,
  }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-semibold text-gray-800 mb-4">Startups by Stage</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#9CA3AF' }}
            angle={-35}
            textAnchor="end"
          />
          <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
