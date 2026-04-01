export default function Badge({ label, color = '#64748B', bg = '#F1F5F9', size = 'md' }) {
  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={{ color, backgroundColor: bg }}
    >
      {label}
    </span>
  );
}
