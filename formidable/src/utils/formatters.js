export const formatCurrency = (amount, currency = 'ETB') => {
  if (amount === null || amount === undefined) return '-';
  if (amount >= 1_000_000_000) {
    return `${currency} ${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `${currency} ${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${currency} ${(amount / 1_000).toFixed(0)}K`;
  }
  return `${currency} ${amount.toLocaleString()}`;
};

export const formatNumber = (n) => {
  if (n === null || n === undefined) return '-';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

export const formatGrowth = (n) => {
  if (n === null || n === undefined) return '-';
  return `+${(n * 100).toFixed(0)}%`;
};

export const formatUSD = (amount) => {
  if (amount === null || amount === undefined) return '-';
  if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`;
  return `$${amount.toLocaleString()}`;
};

export const getSectorLabel = (value) => {
  const map = {
    fintech: 'FinTech',
    agritech: 'AgriTech',
    healthtech: 'HealthTech',
    edtech: 'EdTech',
    logistics: 'Logistics',
    ecommerce: 'E-Commerce',
    cleantech: 'CleanTech',
    proptech: 'PropTech',
  };
  return map[value] || value;
};

export const getStageLabel = (value) => {
  const map = {
    idea: 'Idea Stage',
    pre_seed: 'Pre-Seed',
    seed: 'Seed',
    series_a: 'Series A',
    series_b: 'Series B',
    growth: 'Growth',
  };
  return map[value] || value;
};
