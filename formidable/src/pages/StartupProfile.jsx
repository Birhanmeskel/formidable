import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  Calendar,
  Globe,
  Tag,
  ArrowLeft,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { STARTUPS } from '../data/startups';
import { FOUNDERS } from '../data/founders';
import { SECTORS, STAGES } from '../data/sectors';
import VerificationBadge from '../components/startup/VerificationBadge';
import TractionMetrics from '../components/startup/TractionMetrics';
import FundingTimeline from '../components/startup/FundingTimeline';
import FounderCard from '../components/founder/FounderCard';
import StartupCard from '../components/startup/StartupCard';
import { formatDate, formatUSD, getSectorLabel, getStageLabel } from '../utils/formatters';

export default function StartupProfile() {
  const { slug } = useParams();
  const startup = STARTUPS.find((s) => s.slug === slug);

  if (!startup) return <Navigate to="/startups" replace />;

  const sector = SECTORS.find((s) => s.value === startup.sector);
  const stage = STAGES.find((s) => s.value === startup.stage);
  const founders = FOUNDERS.filter((f) => startup.founders.includes(f.id));
  const related = STARTUPS.filter(
    (s) => s.sector === startup.sector && s.id !== startup.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div
        className="relative pt-16 pb-20"
        style={{
          background: `linear-gradient(135deg, #0F1923 0%, #1A6B3A 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link
            to="/startups"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Directory
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-20 h-20 rounded-2xl border-2 border-white/20 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h1 className="text-3xl font-bold text-white">{startup.name}</h1>
                <VerificationBadge level={startup.verificationLevel} size="lg" />
              </div>
              <p className="text-white/70 text-base mb-4">{startup.tagline}</p>
              <div className="flex items-center gap-4 flex-wrap text-sm text-white/60">
                {sector && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: sector.color + '33', color: '#fff' }}
                  >
                    {sector.label}
                  </span>
                )}
                {stage && (
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: stage.color + '33', color: '#fff' }}
                  >
                    {stage.label}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {startup.location.city}, Ethiopia
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> Founded {new Date(startup.founded).getFullYear()}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} /> {startup.employees} employees
                </span>
              </div>
            </div>

            {startup.website && (
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white border border-white/20 hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <Globe size={14} /> Visit Website <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {/* Main */}
          <div className="lg:col-span-2 space-y-7">
            {/* Traction metrics */}
            <TractionMetrics traction={startup.traction} />

            {/* About */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-3">About {startup.name}</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                {startup.description}
              </p>
            </div>

            {/* Funding timeline */}
            <FundingTimeline fundingHistory={startup.funding.fundingHistory} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Quick Facts</h3>
              <dl className="space-y-3">
                {[
                  { label: 'Founded', value: formatDate(startup.founded) },
                  { label: 'Sector', value: getSectorLabel(startup.sector) },
                  { label: 'Stage', value: getStageLabel(startup.stage) },
                  { label: 'Location', value: `${startup.location.city}, Ethiopia` },
                  { label: 'Employees', value: startup.employees },
                  {
                    label: 'Total Raised',
                    value: formatUSD(startup.funding.totalRaised.amount),
                  },
                  {
                    label: 'Last Round',
                    value: startup.funding.lastRound.type,
                  },
                  {
                    label: 'Round Date',
                    value: formatDate(startup.funding.lastRound.date),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <dt className="text-xs text-gray-400">{label}</dt>
                    <dd className="text-xs font-semibold text-gray-800 text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Founders */}
            {founders.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} style={{ color: '#1A6B3A' }} /> Founders
                  </span>
                </h3>
                <div className="space-y-2.5">
                  {founders.map((f) => (
                    <FounderCard key={f.id} founder={f} />
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {startup.tags?.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                  <Tag size={14} style={{ color: '#1A6B3A' }} /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {startup.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related startups */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                More {getSectorLabel(startup.sector)} Startups
              </h2>
              <Link
                to={`/startups?sector=${startup.sector}`}
                className="text-sm font-medium flex items-center gap-1"
                style={{ color: '#1A6B3A' }}
              >
                View all <Building2 size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {related.map((s) => (
                <StartupCard key={s.id} startup={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
