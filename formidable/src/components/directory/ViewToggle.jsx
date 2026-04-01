import { LayoutGrid, List } from 'lucide-react';
import clsx from 'clsx';

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onChange('grid')}
        className={clsx(
          'p-1.5 rounded-md transition-colors duration-150',
          view === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
        )}
        title="Grid view"
      >
        <LayoutGrid size={16} />
      </button>
      <button
        onClick={() => onChange('list')}
        className={clsx(
          'p-1.5 rounded-md transition-colors duration-150',
          view === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
        )}
        title="List view"
      >
        <List size={16} />
      </button>
    </div>
  );
}
