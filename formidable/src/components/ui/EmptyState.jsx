import { Search } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Search,
  title = 'Nothing found',
  description = 'Try adjusting your search or filters.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: '#F0FDF4' }}
      >
        <Icon size={28} style={{ color: '#1A6B3A' }} />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
