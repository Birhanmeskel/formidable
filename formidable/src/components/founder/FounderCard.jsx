import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin } from 'lucide-react';
import Avatar from '../ui/Avatar';

export default function FounderCard({ founder }) {
  return (
    <Link
      to={`/founders/${founder.slug}`}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white hover:shadow-md hover:border-green-100 transition-all duration-200 group"
    >
      <Avatar src={founder.photo} name={founder.fullName} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors truncate">
            {founder.fullName}
          </span>
          {founder.isVerified && (
            <CheckCircle2 size={14} style={{ color: '#1A6B3A' }} className="flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-500 truncate">{founder.title}</p>
        {founder.location && (
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <MapPin size={10} /> {founder.location.city}
          </p>
        )}
      </div>
    </Link>
  );
}
