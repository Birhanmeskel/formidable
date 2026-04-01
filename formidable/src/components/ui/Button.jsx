import clsx from 'clsx';

const VARIANTS = {
  primary: {
    style: { backgroundColor: '#1A6B3A', color: '#fff' },
    hover: 'hover:opacity-90',
  },
  secondary: {
    style: { backgroundColor: '#D4A017', color: '#fff' },
    hover: 'hover:opacity-90',
  },
  outline: {
    style: { backgroundColor: 'transparent', color: '#1A6B3A', border: '2px solid #1A6B3A' },
    hover: 'hover:bg-green-50',
  },
  ghost: {
    style: { backgroundColor: 'transparent', color: '#1A6B3A' },
    hover: 'hover:bg-green-50',
  },
  danger: {
    style: { backgroundColor: '#C0392B', color: '#fff' },
    hover: 'hover:opacity-90',
  },
  dark: {
    style: { backgroundColor: '#0F1923', color: '#fff' },
    hover: 'hover:opacity-90',
  },
  'outline-white': {
    style: { backgroundColor: 'transparent', color: '#fff', border: '2px solid #fff' },
    hover: 'hover:bg-white hover:text-gray-900',
  },
};

const SIZES = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;

  return (
    <button
      style={v.style}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer',
        s,
        v.hover,
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
