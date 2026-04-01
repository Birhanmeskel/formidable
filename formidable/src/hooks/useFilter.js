import { useMemo } from 'react';

export function useFilter(startups, filters) {
  const filtered = useMemo(() => {
    let result = [...startups];

    // Search
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.location.city.toLowerCase().includes(q)
      );
    }

    // Sector
    if (filters.sector) {
      result = result.filter((s) => s.sector === filters.sector);
    }

    // Stage
    if (filters.stage) {
      result = result.filter((s) => s.stage === filters.stage);
    }

    // Region
    if (filters.region) {
      result = result.filter((s) => s.location.region === filters.region);
    }

    // Verification Level
    if (filters.verificationLevel) {
      result = result.filter(
        (s) => s.verificationLevel >= Number(filters.verificationLevel)
      );
    }

    // Sort
    switch (filters.sortBy) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'founded_new':
        result.sort((a, b) => new Date(b.founded) - new Date(a.founded));
        break;
      case 'founded_old':
        result.sort((a, b) => new Date(a.founded) - new Date(b.founded));
        break;
      case 'funding_high':
        result.sort(
          (a, b) =>
            (b.funding.totalRaised.amount || 0) -
            (a.funding.totalRaised.amount || 0)
        );
        break;
      case 'employees_high':
        result.sort((a, b) => (b.employees || 0) - (a.employees || 0));
        break;
      case 'mau_high':
        result.sort(
          (a, b) =>
            (b.traction.monthlyActiveUsers || 0) -
            (a.traction.monthlyActiveUsers || 0)
        );
        break;
      default:
        result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [startups, filters]);

  return filtered;
}
