import { useState } from 'react';
import clsx from 'clsx';

const SIZES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl',
};

export default function Avatar({ src, name = '', size = 'md', className = '' }) {
  const [imgError, setImgError] = useState(false);
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClass = SIZES[size] || SIZES.md;

  if (!src || imgError) {
    return (
      <div
        className={clsx(
          'rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0',
          sizeClass,
          className
        )}
        style={{ backgroundColor: '#1A6B3A' }}
      >
        {initials || '?'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImgError(true)}
      className={clsx('rounded-full object-cover flex-shrink-0', sizeClass, className)}
    />
  );
}
