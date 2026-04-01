import clsx from 'clsx';

export default function Card({ children, className = '', hover = false, padding = true }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-100',
        padding && 'p-6',
        hover && 'transition-shadow duration-200 hover:shadow-md cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
