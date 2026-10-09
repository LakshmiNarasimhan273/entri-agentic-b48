import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import createStore from '../store';
import dealsReducer, { moveDeal } from '../store/dealsSlice';
import { loadInitialState, DEFAULT_DEALS } from '../utils/storage';

function setup(route = '/login') {
  const store = createStore(loadInitialState());
  const utils = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  return { store, user: userEvent.setup(), ...utils };
}

async function registerAndLand(user) {
  await user.click(screen.getByText('Sign Up'));
  await user.type(screen.getByLabelText('Name'), 'Test User');
  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.type(screen.getByLabelText('Password'), 'secret1');
  await user.type(screen.getByLabelText('Confirm Password'), 'secret1');
  await user.click(screen.getByRole('button', { name: 'Sign Up' }));
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(window, 'alert').mockImplementation(() => {});
  vi.spyOn(window, 'confirm').mockImplementation(() => true);
});

describe('auth', () => {
  it('redirects anonymous users to login', () => {
    setup('/contacts');
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
  });

  it('validates register form', async () => {
    const { user } = setup('/register');
    await user.type(screen.getByLabelText('Password'), '123');
    await user.click(screen.getByRole('button', { name: 'Sign Up' }));
    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 6 characters long.')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();
  });

  it('registers, persists session, logs out, and logs back in', async () => {
    const { user, store } = setup('/login');
    await registerAndLand(user);
    expect(await screen.findByText('Recent Activity')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('crm_session')).email).toBe('test@example.com');
    expect(JSON.parse(localStorage.getItem('crm_users'))).toHaveLength(1);

    await user.click(screen.getByText('Logout'));
    expect(await screen.findByText('Welcome Back!')).toBeInTheDocument();
    expect(localStorage.getItem('crm_session')).toBeNull();

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();

    await user.clear(screen.getByLabelText('Password'));
    await user.type(screen.getByLabelText('Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Login' }));
    expect(await screen.findByText('Recent Activity')).toBeInTheDocument();
    expect(store.getState().auth.session.name).toBe('Test User');
  });
});

describe('contacts', () => {
  it('lists seeded contacts, searches, filters, adds, edits and deletes', async () => {
    const { user, store } = setup('/login');
    await registerAndLand(user);
    await user.click(await screen.findByText('Contacts', { selector: 'span' }));

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Peter Jones')).toBeInTheDocument();

    // search
    await user.type(screen.getByPlaceholderText('Search contacts...'), 'jane');
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText('Search contacts...'));

    // tag filter
    await user.selectOptions(screen.getByRole('combobox'), 'partner');
    expect(screen.getByText('Peter Jones')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
    await user.selectOptions(screen.getByRole('combobox'), '');

    // add
    await user.click(screen.getByText('Add Contact'));
    await user.click(screen.getByRole('button', { name: 'Save Contact' }));
    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Name'), 'Alice Brown');
    await user.type(screen.getByLabelText('Email'), 'alice@example.com');
    await user.type(screen.getByLabelText(/Tags/), 'lead, VIP');
    await user.click(screen.getByRole('button', { name: 'Save Contact' }));
    expect(await screen.findByText('Alice Brown')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('crm_contacts'))).toHaveLength(4);

    // edit (and deal contactName sync)
    const row = screen.getByText('John Doe').closest('tr');
    await user.click(within(row).getByTitle('Edit'));
    const nameInput = screen.getByLabelText('Name');
    expect(nameInput).toHaveValue('John Doe');
    await user.clear(nameInput);
    await user.type(nameInput, 'Johnny Doe');
    await user.click(screen.getByRole('button', { name: 'Save Contact' }));
    expect(await screen.findByText('Johnny Doe')).toBeInTheDocument();
    expect(store.getState().deals.items.find((d) => d.id === 'd1').contactName).toBe('Johnny Doe');

    // delete
    const row2 = screen.getByText('Alice Brown').closest('tr');
    await user.click(within(row2).getByTitle('Delete'));
    expect(screen.queryByText('Alice Brown')).not.toBeInTheDocument();
  });
});

describe('pipeline', () => {
  it('renders columns with counts and supports add / edit / delete', async () => {
    const { user, store } = setup('/login');
    await registerAndLand(user);
    await user.click(await screen.findByText('Pipeline', { selector: 'span' }));

    expect(await screen.findByText('Website Redesign')).toBeInTheDocument();
    expect(screen.getByText('2 Deals')).toBeInTheDocument();
    expect(screen.getAllByText('1 Deal')).toHaveLength(3);
    expect(screen.getByText('Closed: 2026-07-20')).toBeInTheDocument();

    // add
    await user.click(screen.getByText('Add Deal'));
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('button', { name: 'Add Deal' }));
    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Title'), 'New Big Deal');
    await user.type(screen.getByLabelText('Value ($)'), '9000');
    await user.selectOptions(screen.getByLabelText('Contact'), 'c3');
    await user.selectOptions(screen.getByLabelText('Stage'), 'qualified');
    await user.click(within(dialog).getByRole('button', { name: 'Add Deal' }));
    expect(await screen.findByText('New Big Deal')).toBeInTheDocument();
    expect(screen.getByText('Value: $9,000')).toBeInTheDocument();
    expect(screen.getAllByText('2 Deals')).toHaveLength(2);
    expect(JSON.parse(localStorage.getItem('crm_deals'))).toHaveLength(6);

    // edit
    const card = screen.getByText('Website Redesign').closest('.deal-card');
    await user.click(within(card).getByTitle('Edit'));
    const title = screen.getByLabelText('Title');
    await user.clear(title);
    await user.type(title, 'Website Redesign v2');
    await user.click(screen.getByRole('button', { name: 'Save Deal' }));
    expect(await screen.findByText('Website Redesign v2')).toBeInTheDocument();

    // delete
    const card2 = screen.getByText('New Big Deal').closest('.deal-card');
    await user.click(within(card2).getByTitle('Delete'));
    expect(screen.queryByText('New Big Deal')).not.toBeInTheDocument();
    expect(store.getState().deals.items).toHaveLength(5);
  });

  it('moveDeal reducer moves between stages and reorders', () => {
    const base = { items: DEFAULT_DEALS };
    // d1 (new) -> contacted at index 0
    let s = dealsReducer(base, moveDeal({ id: 'd1', toStage: 'contacted', toIndex: 0 }));
    const contacted = s.items.filter((d) => d.stage === 'contacted').map((d) => d.id);
    expect(contacted).toEqual(['d1', 'd3']);
    // d2 -> end of won_lost
    s = dealsReducer(s, moveDeal({ id: 'd2', toStage: 'won_lost', toIndex: 1 }));
    expect(s.items.filter((d) => d.stage === 'won_lost').map((d) => d.id)).toEqual(['d5', 'd2']);
    // reorder within same column: d2 to top of won_lost
    s = dealsReducer(s, moveDeal({ id: 'd2', toStage: 'won_lost', toIndex: 0 }));
    expect(s.items.filter((d) => d.stage === 'won_lost').map((d) => d.id)).toEqual(['d2', 'd5']);
    expect(s.items).toHaveLength(5);
  });
});

describe('settings', () => {
  it('updates profile, password and preferences', async () => {
    const { user, store } = setup('/login');
    await registerAndLand(user);
    await user.click(await screen.findByText('Settings', { selector: 'span' }));

    const name = await screen.findByLabelText('Name');
    expect(name).toHaveValue('Test User');
    await user.clear(name);
    await user.type(name, 'Renamed User');
    await user.click(screen.getByRole('button', { name: 'Save Profile' }));
    expect(screen.getByText('Profile updated successfully.')).toBeInTheDocument();
    expect(store.getState().auth.session.name).toBe('Renamed User');
    expect(JSON.parse(localStorage.getItem('crm_users'))[0].name).toBe('Renamed User');

    await user.type(screen.getByLabelText('Current Password'), 'nope');
    await user.type(screen.getByLabelText('New Password'), 'newpass1');
    await user.type(screen.getByLabelText('Confirm New Password'), 'newpass1');
    await user.click(screen.getByRole('button', { name: 'Change Password' }));
    expect(screen.getByText('Current password is incorrect.')).toBeInTheDocument();
    await user.clear(screen.getByLabelText('Current Password'));
    await user.type(screen.getByLabelText('Current Password'), 'secret1');
    await user.click(screen.getByRole('button', { name: 'Change Password' }));
    expect(screen.getByText('Password changed successfully.')).toBeInTheDocument();
    expect(store.getState().auth.users[0].password).toBe('newpass1');

    await user.click(screen.getByLabelText('Marketing Emails'));
    await user.click(screen.getByRole('button', { name: 'Save Preferences' }));
    expect(JSON.parse(localStorage.getItem('crm_preferences')).marketingEmails).toBe(true);
  });
});
