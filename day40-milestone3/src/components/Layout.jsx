import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'fa-tachometer-alt', label: 'Dashboard' },
  { to: '/contacts', icon: 'fa-address-book', label: 'Contacts' },
  { to: '/pipeline', icon: 'fa-project-diagram', label: 'Pipeline' },
  { to: '/settings', icon: 'fa-cog', label: 'Settings' },
];

const TITLES = [
  ['/dashboard', 'Dashboard'],
  ['/contacts/', 'Add/Edit Contact'],
  ['/contacts', 'Contacts'],
  ['/pipeline', 'Sales Pipeline'],
  ['/settings', 'Settings'],
];

// Sidebar + topbar shell shared by all logged-in pages
export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const title = (TITLES.find(([p]) => pathname.startsWith(p)) || [])[1] || 'CRM App';

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <div className="app-layout">
      <div className={`sidebar${menuOpen ? ' is-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">CRM App</div>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            {NAV_ITEMS.map((item) => (
              <li className="sidebar-nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => setMenuOpen(false)}
                >
                  <i className={`fas ${item.icon}`}></i> <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
            <li className="sidebar-nav-item">
              <a href="/login" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="topbar">
        <button className="menu-toggle" aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
          <i className="fas fa-bars"></i>
        </button>
        <h2>{title}</h2>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
