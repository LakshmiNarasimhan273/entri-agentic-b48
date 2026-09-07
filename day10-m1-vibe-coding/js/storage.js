/* storage.js - LocalStorage Helper Utility */

const STORAGE_KEYS = {
  USERS: 'crm_users',
  CONTACTS: 'crm_contacts',
  DEALS: 'crm_deals',
  SESSION: 'crm_session'
};

// Default seed data matching Milestone 1 static visual layouts
const DEFAULT_CONTACTS = [
  {
    id: 'c1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    company: 'ABC Corp',
    tags: 'customer',
    notes: 'Key decision maker for enterprise expansion.'
  },
  {
    id: 'c2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    company: 'XYZ Inc',
    tags: 'lead',
    notes: 'Met at national trade show, interested in pipeline integrations.'
  },
  {
    id: 'c3',
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    phone: '555-123-4567',
    company: 'Global Solutions',
    tags: 'partner',
    notes: 'Handles European logistics relationships.'
  }
];

const DEFAULT_DEALS = [
  {
    id: 'd1',
    title: 'Website Redesign',
    value: 5000,
    contactId: 'c1',
    contactName: 'John Doe',
    stage: 'new', // stages: new, contacted, qualified, won_lost
    dueDate: '2026-08-15'
  },
  {
    id: 'd2',
    title: 'SEO Optimization',
    value: 2500,
    contactId: 'c2',
    contactName: 'Jane Smith',
    stage: 'new',
    dueDate: '2026-09-01'
  },
  {
    id: 'd3',
    title: 'Cloud Migration',
    value: 12000,
    contactId: 'c3',
    contactName: 'Peter Jones',
    stage: 'contacted',
    dueDate: '2026-10-15'
  },
  {
    id: 'd4',
    title: 'CRM Integration',
    value: 8500,
    contactId: 'c1',
    contactName: 'John Doe',
    stage: 'qualified',
    dueDate: '2026-11-30'
  },
  {
    id: 'd5',
    title: 'Mobile App Dev',
    value: 15000,
    contactId: 'c2',
    contactName: 'Jane Smith',
    stage: 'won_lost', // stage names matching pipeline columns
    dueDate: '2026-07-20'
  }
];

// Seed storage with initial data if empty
export function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CONTACTS)) {
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(DEFAULT_CONTACTS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.DEALS)) {
    localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(DEFAULT_DEALS));
  }
}

// User-related Storage API
export function getUsers() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS)) || [];
  } catch (e) {
    console.error('Error parsing users from storage:', e);
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Session-related Storage API
export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION)) || null;
  } catch (e) {
    return null;
  }
}

export function saveSession(user) {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

// Contacts-related Storage API
export function getContacts() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTACTS)) || [];
  } catch (e) {
    console.error('Error parsing contacts:', e);
    return [];
  }
}

export function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
}

// Deals-related Storage API
export function getDeals() {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DEALS)) || [];
  } catch (e) {
    console.error('Error parsing deals:', e);
    return [];
  }
}

export function saveDeals(deals) {
  localStorage.setItem(STORAGE_KEYS.DEALS, JSON.stringify(deals));
}

// Initialize on import automatically to make sure we always have seeded structures
initStorage();
