import { ShieldCheck, ShieldAlert, Shield, Star } from 'lucide-react';
import { VERIFICATION_LEVELS } from '../../data/sectors';

const ICONS = {
  1: Shield,
  2: ShieldAlert,
  3: ShieldCheck,
  4: Star,
};

export default function VerificationBadge({ level = 1, showLabel = true, size = 'sm' }) {
  const info = VERIFICATION_LEVELS[level] || VERIFICATION_LEVELS[1];
  const Icon = ICONS[level] || Shield;
  const iconSize = size === 'lg' ? 18 : 14;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full font-medium"
      style={{
        color: info.color,
        backgroundColor: info.bg,
        padding: size === 'lg' ? '4px 10px' : '2px 8px',
        fontSize: size === 'lg' ? '13px' : '11px',
      }}
      title={info.description}
    >
      <Icon size={iconSize} />
      {showLabel && info.label}
    </span>
  );
}
