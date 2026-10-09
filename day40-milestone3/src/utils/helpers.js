export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formatCurrency = (n) => '$' + Number(n || 0).toLocaleString('en-US');

export const pluralDeals = (n) => `${n} ${n === 1 ? 'Deal' : 'Deals'}`;

export const parseTags = (tags) =>
  String(tags || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const formatTag = capitalize;

// Badge colours used in the original contacts table
export const badgeClass = (tag) => {
  switch (tag.toLowerCase()) {
    case 'customer': return 'badge-primary';
    case 'lead': return 'badge-secondary';
    case 'partner': return 'badge-info';
    default: return 'badge-success';
  }
};
