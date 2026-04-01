import { Download, TrendingUp, Users, DollarSign, Globe } from 'lucide-react';
import { STARTUPS } from '../../data/startups';
import { FOUNDERS } from '../../data/founders';
import SectorPieChart from '../../components/charts/SectorPieChart';
import StageBarChart from '../../components/charts/StageBarChart';
import FundingAreaChart from '../../components/charts/FundingAreaChart';
import GrowthLineChart from '../../components/charts/GrowthLineChart';
import Button from '../../components/ui/Button';
import { useExport } from '../../hooks/useExport';
import { formatUSD, formatNumber } from '../../utils/formatters';

export default function Analytics() {
  const { exportToCSV } = useExport();

  const totalFunding = STARTUPS.reduce((s, st) => s + (st.funding.totalRaised.amount || 0), 0);
  const totalMAU = STARTUPS.reduce((s, st) => s + (st.traction.monthlyActiveUsers || 0), 0);
  const avgEmployees = Math.round(
    STARTUPS.reduce((s, st) => s + (st.employees || 0), 0) / STARTUPS.length
  );

  const handleExport = () => {
    const exportData = STARTUPS.map((s) => ({
      id: s.id,
      name: s.name,
      sector: s.sector,
      stage: s.stage,
      city: s.location.city,
      founded: s.founded,
      employees: s.employees,
      verificationLevel: s.verificationLevel,
      verificationStatus: s.verificationStatus,
      mau: s.traction.monthlyActiveUsers,
      revenueETB: s.traction.revenue.amount,
      growth: s.traction.growth,
      customers: s.traction.customers,
      totalRaisedUSD: s.funding.totalRaised.amount,
      lastRound: s.funding.lastRound.type,
      lastRoundDate: s.funding.lastRound.date,
    }));
    exportToCSV(exportData, 'formidable-startups');
  };

  const quickStats = [
    {
      label: 'Total Startups',
      value: STARTUPS.length,
      icon: Globe,
      color: '#1A6B3A',
      bg: '#F0FDF4',
    },
    {
      label: 'Total Ecosystem Funding',
      value: formatUSD(totalFunding),
      icon: DollarSign,
      color: '#D4A017',
      bg: '#FFFBEB',
    },
    {
      label: 'Total MAU Across All',
      value: formatNumber(totalMAU),
      icon: Users,
      color: '#2563EB',
      bg: '#EFF6FF',
    },
    {
      label: 'Avg. Employees',
      value: avgEmployees,
      icon: TrendingUp,
      color: '#7C3AED',
      bg: '#F5F3FF',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">
            Ecosystem insights and trends for Ethiopia's startup landscape.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download size={15} /> Export CSV
        </Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {quickStats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: bg }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SectorPieChart startups={STARTUPS} />
        <StageBarChart startups={STARTUPS} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FundingAreaChart startups={STARTUPS} />
        <GrowthLineChart startups={STARTUPS} />
      </div>

      {/* Sector breakdown table */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Sector Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Sector</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Startups</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Total Funding</th>
                <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Avg. MAU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {['fintech', 'agritech', 'healthtech', 'edtech', 'logistics', 'ecommerce', 'cleantech', 'proptech'].map(
                (sector) => {
                  const sectorStartups = STARTUPS.filter((s) => s.sector === sector);
                  const sectorFunding = sectorStartups.reduce(
                    (sum, s) => sum + (s.funding.totalRaised.amount || 0),
                    0
                  );
                  const avgMAU = sectorStartups.length > 0
                    ? Math.round(
                        sectorStartups.reduce((sum, s) => sum + (s.traction.monthlyActiveUsers || 0), 0) /
                          sectorStartups.length
                      )
                    : 0;
                  const labels = {
                    fintech: 'FinTech', agritech: 'AgriTech', healthtech: 'HealthTech',
                    edtech: 'EdTech', logistics: 'Logistics', ecommerce: 'E-Commerce',
                    cleantech: 'CleanTech', proptech: 'PropTech',
                  };
                  return (
                    <tr key={sector} className="hover:bg-gray-50">
                      <td className="py-3 text-sm text-gray-700 font-medium">{labels[sector]}</td>
                      <td className="py-3 text-sm text-gray-600 text-right">{sectorStartups.length}</td>
                      <td className="py-3 text-sm text-gray-600 text-right">{formatUSD(sectorFunding)}</td>
                      <td className="py-3 text-sm text-gray-600 text-right">{formatNumber(avgMAU)}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
