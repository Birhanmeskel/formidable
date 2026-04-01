import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp, ArrowRight } from 'lucide-react';
import Avatar from '../ui/Avatar';
import VerificationBadge from './VerificationBadge';
import { SECTORS, STAGES } from '../../data/sectors';
import { formatNumber } from '../../utils/formatters';

export default function StartupCard({ startup, view = 'grid' }) {
  const sector = SECTORS.find((s) => s.value === startup.sector);
  const stage = STAGES.find((s) => s.value === startup.stage);

  if (view === 'list') {
    return (
      <Link
        to={`/startups/${startup.slug}`}
        className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-4"
      >
        <div className="flex items-center gap-4">
          <Avatar src={startup.logo} name={startup.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-gray-900 text-base">{startup.name}</h3>
              <VerificationBadge level={startup.verificationLevel} />
            </div>
            <p className="text-sm text-gray-500 truncate">{startup.shortDescription}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {sector && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ color: sector.color, backgroundColor: sector.color + '18' }}
                >
                  {sector.label}
                </span>
              )}
              {stage && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ color: stage.color, backgroundColor: stage.color + '18' }}
                >
                  {stage.label}
                </span>
              )}
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={11} /> {startup.location.city}
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-800">{formatNumber(startup.employees)}</div>
              <div className="text-xs text-gray-400">Employees</div>
            </div>
            <div className="text-center">
              <div className="font-semibold" style={{ color: '#1A6B3A' }}>
                {formatNumber(startup.traction.monthlyActiveUsers) !== '-'
                  ? formatNumber(startup.traction.monthlyActiveUsers)
                  : '-'}
              </div>
              <div className="text-xs text-gray-400">MAU</div>
            </div>
          </div>
          <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/startups/${startup.slug}`}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 overflow-hidden group"
    >
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <Avatar src={startup.logo} name={startup.name} size="lg" />
          <VerificationBadge level={startup.verificationLevel} />
        </div>
        <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-green-700 transition-colors">
          {startup.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {startup.shortDescription}
        </p>
      </div>

      {/* Tags row */}
      <div className="px-5 pb-3 flex items-center gap-2 flex-wrap">
        {sector && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ color: sector.color, backgroundColor: sector.color + '18' }}
          >
            {sector.label}
          </span>
        )}
        {stage && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ color: stage.color, backgroundColor: stage.color + '18' }}
          >
            {stage.label}
          </span>
        )}
      </div>

      {/* Location + employees */}
      <div className="px-5 pb-3 flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <MapPin size={11} /> {startup.location.city}, Ethiopia
        </span>
        <span className="flex items-center gap-1">
          <Users size={11} /> {startup.employees} employees
        </span>
      </div>

      {/* Traction */}
      {startup.traction.monthlyActiveUsers > 0 && (
        <div className="mx-5 mb-4 bg-gray-50 rounded-lg p-2.5 flex items-center justify-between">
          <div className="text-center">
            <div className="text-xs font-semibold text-gray-700">
              {formatNumber(startup.traction.monthlyActiveUsers)}
            </div>
            <div className="text-xs text-gray-400">MAU</div>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="text-center">
            <div className="text-xs font-semibold" style={{ color: '#1A6B3A' }}>
              +{Math.round(startup.traction.growth * 100)}%
            </div>
            <div className="text-xs text-gray-400">Growth</div>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="text-center">
            <div className="text-xs font-semibold text-gray-700">
              {formatNumber(startup.traction.customers)}
            </div>
            <div className="text-xs text-gray-400">Customers</div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="px-5 py-3 flex items-center justify-between border-t border-gray-50 text-xs font-medium"
        style={{ color: '#1A6B3A' }}
      >
        <span>View Profile</span>
        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
