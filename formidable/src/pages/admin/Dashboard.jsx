import { Building2, Clock, DollarSign, Users } from 'lucide-react';
import { STARTUPS } from '../../data/startups';
import { FOUNDERS } from '../../data/founders';
import StatCard from '../../components/admin/StatCard';
import SectorPieChart from '../../components/charts/SectorPieChart';
import StageBarChart from '../../components/charts/StageBarChart';
import { formatUSD } from '../../utils/formatters';

export default function Dashboard() {
  const totalFunding = STARTUPS.reduce(
    (sum, s) => sum + (s.funding.totalRaised.amount || 0),
    0
  );
  const pendingCount = STARTUPS.filter(
    (s) => s.verificationStatus === 'pending' || s.verificationStatus === 'under_review'
  ).length;
  const verifiedFounders = FOUNDERS.filter((f) => f.isVerified).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of Ethiopia's startup ecosystem.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={Building2}
          label="Total Startups"
          value={STARTUPS.length}
          trend={12}
          trendLabel="vs last month"
          color="#1A6B3A"
          bg="#F0FDF4"
        />
        <StatCard
          icon={Clock}
          label="Pending Verification"
          value={pendingCount}
          trend={-5}
          trendLabel="vs last month"
          color="#D4A017"
          bg="#FFFBEB"
        />
        <StatCard
          icon={DollarSign}
          label="Total Funding"
          value={formatUSD(totalFunding)}
          trend={18}
          trendLabel="ecosystem growth"
          color="#2563EB"
          bg="#EFF6FF"
        />
        <StatCard
          icon={Users}
          label="Active Founders"
          value={FOUNDERS.length}
          trend={8}
          trendLabel="verified founders"
          color="#7C3AED"
          bg="#F5F3FF"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectorPieChart startups={STARTUPS} />
        <StageBarChart startups={STARTUPS} />
      </div>

      {/* Recent startups */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Recently Added Startups</h3>
        <div className="space-y-3">
          {[...STARTUPS]
            .sort((a, b) => new Date(b.founded) - new Date(a.founded))
            .slice(0, 5)
            .map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <img
                  src={s.logo}
                  alt={s.name}
                  className="w-9 h-9 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{s.name}</div>
                  <div className="text-xs text-gray-400 truncate">{s.shortDescription}</div>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    color: s.verificationStatus === 'verified' ? '#1A6B3A' : '#92400E',
                    backgroundColor: s.verificationStatus === 'verified' ? '#F0FDF4' : '#FEF3C7',
                  }}
                >
                  {s.verificationStatus}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
