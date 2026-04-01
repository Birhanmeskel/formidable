import clsx from 'clsx';

export default function Select({
  label,
  error,
  options = [],
  placeholder = 'Select...',
  className = '',
  id,
  required,
  ...rest
}) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={clsx(
          'w-full px-3 py-2.5 rounded-lg border text-sm text-gray-900 bg-white transition-colors duration-200',
          'focus:outline-none focus:ring-2',
          error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-gray-200 focus:border-green-600 focus:ring-green-100',
          className
        )}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
