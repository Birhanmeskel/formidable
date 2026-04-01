import Papa from 'papaparse';

export function useExport() {
  const exportToCSV = (data, filename = 'export') => {
    if (!data || data.length === 0) return;

    // Flatten nested objects for CSV
    const flatData = data.map((item) => {
      const flat = {};
      const flatten = (obj, prefix = '') => {
        Object.entries(obj).forEach(([key, val]) => {
          const newKey = prefix ? `${prefix}_${key}` : key;
          if (val === null || val === undefined) {
            flat[newKey] = '';
          } else if (Array.isArray(val)) {
            flat[newKey] = val.join(', ');
          } else if (typeof val === 'object') {
            flatten(val, newKey);
          } else {
            flat[newKey] = val;
          }
        });
      };
      flatten(item);
      return flat;
    });

    const csv = Papa.unparse(flatData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return { exportToCSV };
}
