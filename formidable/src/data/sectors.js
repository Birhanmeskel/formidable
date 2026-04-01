export const SECTORS = [
  { value: 'fintech', label: 'FinTech', color: '#1A6B3A', icon: 'DollarSign' },
  { value: 'agritech', label: 'AgriTech', color: '#D4A017', icon: 'Sprout' },
  { value: 'healthtech', label: 'HealthTech', color: '#2563EB', icon: 'Heart' },
  { value: 'edtech', label: 'EdTech', color: '#7C3AED', icon: 'BookOpen' },
  { value: 'logistics', label: 'Logistics', color: '#EA580C', icon: 'Truck' },
  { value: 'ecommerce', label: 'E-Commerce', color: '#DB2777', icon: 'ShoppingCart' },
  { value: 'cleantech', label: 'CleanTech', color: '#059669', icon: 'Leaf' },
  { value: 'proptech', label: 'PropTech', color: '#0891B2', icon: 'Building' },
];

export const STAGES = [
  { value: 'idea', label: 'Idea Stage', color: '#94A3B8' },
  { value: 'pre_seed', label: 'Pre-Seed', color: '#64748B' },
  { value: 'seed', label: 'Seed', color: '#D4A017' },
  { value: 'series_a', label: 'Series A', color: '#1A6B3A' },
  { value: 'series_b', label: 'Series B', color: '#0F1923' },
  { value: 'growth', label: 'Growth', color: '#7C3AED' },
];

export const REGIONS = [
  { value: 'addis_ababa', label: 'Addis Ababa' },
  { value: 'oromia', label: 'Oromia' },
  { value: 'amhara', label: 'Amhara' },
  { value: 'tigray', label: 'Tigray' },
  { value: 'snnpr', label: 'SNNPR' },
  { value: 'dire_dawa', label: 'Dire Dawa' },
];

export const VERIFICATION_LEVELS = {
  1: { label: 'Claimed', color: '#94A3B8', bg: '#F1F5F9', description: 'Self-submitted' },
  2: { label: 'Validated', color: '#2563EB', bg: '#EFF6FF', description: 'Documents reviewed' },
  3: { label: 'Verified', color: '#1A6B3A', bg: '#F0FDF4', description: 'Team confirmed' },
  4: { label: 'Accredited', color: '#D4A017', bg: '#FFFBEB', description: 'Fully audited' },
};
