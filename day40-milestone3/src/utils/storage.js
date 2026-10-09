/* storage.js - LocalStorage helper (ported from the original js/storage.js) */

export const STORAGE_KEYS = {
  USERS: 'crm_users',
  CONTACTS: 'crm_contacts',
  DEALS: 'crm_deals',
  SESSION: 'crm_session',
  PREFERENCES: 'crm_preferences',
};

// Default seed data from the original application
export const DEFAULT_CONTACTS = [
  { id: 'c1', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', company: 'ABC Corp', tags: 'customer', notes: 'Key decision maker for enterprise expansion.' },
  { id: 'c2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', company: 'XYZ Inc', tags: 'lead', notes: 'Met at national trade show, interested in pipeline integrations.' },
  { id: 'c3', name: 'Peter Jones', email: 'peter.jones@example.com', phone: '555-123-4567', company: 'Global Solutions', tags: 'partner', notes: 'Handles European logistics relationships.' },
];

export const DEFAULT_DEALS = [
  { id: 'd1', title: 'Website Redesign', value: 5000, contactId: 'c1', contactName: 'John Doe', stage: 'new', dueDate: '2026-08-15' },
  { id: 'd2', title: 'SEO Optimization', value: 2500, contactId: 'c2', contactName: 'Jane Smith', stage: 'new', dueDate: '2026-09-01' },
  { id: 'd3', title: 'Cloud Migration', value: 12000, contactId: 'c3', contactName: 'Peter Jones', stage: 'contacted', dueDate: '2026-10-15' },
  { id: 'd4', title: 'CRM Integration', value: 8500, contactId: 'c1', contactName: 'John Doe', stage: 'qualified', dueDate: '2026-11-30' },
  { id: 'd5', title: 'Mobile App Dev', value: 15000, contactId: 'c2', contactName: 'Jane Smith', stage: 'won_lost', dueDate: '2026-07-20' },
];

export const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  appNotifications: true,
  marketingEmails: false,
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (e) {
    console.error(`Error parsing "${key}" from storage:`, e);
    return fallback;
  }
}

export function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving "${key}" to storage:`, e);
  }
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

// Initial state used to hydrate the Redux store (seeds data on first run)
export function loadInitialState() {
  return {
    auth: {
      users: read(STORAGE_KEYS.USERS, []),
      session: read(STORAGE_KEYS.SESSION, null),
    },
    contacts: { items: read(STORAGE_KEYS.CONTACTS, DEFAULT_CONTACTS) },
    deals: { items: read(STORAGE_KEYS.DEALS, DEFAULT_DEALS) },
    preferences: read(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES),
  };
}
