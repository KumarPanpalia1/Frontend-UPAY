import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useExpenses } from '../../hooks/useExpenses';
import './Navbar.css';

// SVG icons as tiny inline components — no icon library needed
const Icons = {
  Dashboard: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Donations: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2C4.8 2 3 3.8 3 6c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z"
        stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="7" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.1"/>
    </svg>
  ),
  Expenses: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1.5" width="10" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Funds: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M7 4v6M5 5.5h3a1 1 0 010 2H6a1 1 0 000 2h3"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Settings: () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="6.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M6.5 1v1.5M6.5 10v1.5M1 6.5h1.5M10 6.5h1.5M2.6 2.6l1.1 1.1M9.3 9.3l1.1 1.1M9.3 2.6l-1.1 1.1M3.7 9.3l-1.1 1.1"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  SignOut: () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M5 2H2.5A1.5 1.5 0 001 3.5v6A1.5 1.5 0 002.5 11H5M9 9.5l3-3-3-3M12 6.5H5"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { expenses }              = useExpenses();
  const navigate                  = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Count pending expenses for the admin badge
  const pendingCount = isAdmin
    ? expenses.filter(e => e.status === 'pending').length
    : 0;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = (name) =>
    name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '??';

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="nav-brand">
        <div className="nav-logo">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="14" height="9" rx="2" stroke="#185FA5" strokeWidth="1.2"/>
            <path d="M1 7h14" stroke="#185FA5" strokeWidth="1.2"/>
            <rect x="3" y="9.5" width="4" height="1.5" rx="0.5" fill="#185FA5"/>
          </svg>
        </div>
        <span className="nav-title">UPAY Finance</span>
      </div>

      {/* Navigation links */}
      <div className="nav-links">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icons.Dashboard />
          Dashboard
        </NavLink>

        <NavLink to="/donations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icons.Donations />
          Donations
        </NavLink>

        <NavLink to="/expenses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icons.Expenses />
          {isAdmin ? 'Expenses' : 'My expenses'}
          {isAdmin && pendingCount > 0 && (
            <span className="nav-badge">{pendingCount}</span>
          )}
        </NavLink>

        {/* Fund allocation — visible to both roles */}
        <NavLink to="/funds" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Icons.Funds />
          {isAdmin ? 'Fund allocation' : 'Funds'}
        </NavLink>
      </div>

      {/* Right side */}
      <div className="nav-right">
        <span className={`nav-role-badge ${isAdmin ? 'admin' : 'volunteer'}`}>
          {isAdmin ? 'Admin' : 'Volunteer'}
        </span>

        {/* Avatar + dropdown */}
        <div className="nav-dropdown-wrap" ref={dropdownRef}>
          <button
            className={`nav-avatar ${isAdmin ? 'admin' : 'volunteer'}`}
            onClick={() => setDropdownOpen(prev => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
          >
            {initials(user?.name)}
          </button>

          {dropdownOpen && (
            <div className="nav-dropdown" role="menu">
              <div className="nav-dropdown-header">
                <div className="nav-dropdown-name">{user?.name}</div>
                <div className="nav-dropdown-email">{user?.email}</div>
              </div>

              <button className="nav-dropdown-item" onClick={() => { navigate('/profile'); setDropdownOpen(false); }}>
                <Icons.Settings /> Profile &amp; settings
              </button>

              <div className="nav-dropdown-divider" />

              <button className="nav-dropdown-item danger" onClick={handleLogout}>
                <Icons.SignOut /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}