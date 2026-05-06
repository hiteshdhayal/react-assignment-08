import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconSpin = () => (
  <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);
const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconID = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconCheck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const IconAlert = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconWifi = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>
  </svg>
);
const IconUserRole = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

function initials(user) {
  if (!user) return '?';
  const name = user.username || user.email || '';
  return name.slice(0, 2).toUpperCase();
}

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <>
      <div className="skeleton skeleton-profile-hero" />
      <div className="skeleton-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton skeleton-card" />
        ))}
      </div>
    </>
  );
}

// ── ProfileSection ────────────────────────────────────────────────────────────
function ProfileSection({ user }) {
  return (
    <>
      {/* Hero card */}
      <div className="profile-hero">
        <div className="profile-hero-banner" />
        <div className="profile-hero-body">
          <div className="profile-avatar-wrap">
            <div className="profile-avatar-xl">{initials(user)}</div>
          </div>
          <h2 className="profile-name">{user?.username || '—'}</h2>
          <p className="profile-handle">{user?.email || '—'}</p>
          <div className="badge-row">
            <span className="badge badge-purple">{user?.role || 'USER'}</span>
            {user?.isEmailVerified && (
              <span className="badge badge-green">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="section-header">
        <p className="section-title">Account Details</p>
        <p className="section-desc">Your personal information and account metadata</p>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-icon icon-blue"><IconMail /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">Email</p>
            <p className="detail-card-value">{user?.email || '—'}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-icon icon-purple"><IconUser /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">Username</p>
            <p className="detail-card-value">@{user?.username || '—'}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-icon icon-orange"><IconUserRole /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">Role</p>
            <p className="detail-card-value">{user?.role || '—'}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-icon icon-gray"><IconID /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">User ID</p>
            <p className="detail-card-value mono">{user?._id || '—'}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-icon icon-green"><IconCheck /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">Email Verified</p>
            <p className="detail-card-value">{user?.isEmailVerified ? 'Yes — Verified' : 'Not verified'}</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-card-icon icon-blue"><IconCalendar /></div>
          <div className="detail-card-body">
            <p className="detail-card-label">Member Since</p>
            <p className="detail-card-value">{formatDate(user?.createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── SecuritySection ───────────────────────────────────────────────────────────
function SecuritySection({ user, onLogout, logoutLoading }) {
  return (
    <div className="security-grid">
      {/* Session status */}
      <div className="security-card">
        <div className="security-card-head">
          <div className="security-card-icon icon-green"><IconWifi /></div>
          <div>
            <p className="security-card-title">Session Status</p>
            <p className="security-card-desc">Your current login session</p>
          </div>
        </div>
        <div className="security-card-body">
          <div className="info-row">
            <span className="info-label">Status</span>
            <span className="status-dot">Active</span>
          </div>
          <div className="info-row">
            <span className="info-label">Signed in as</span>
            <span className="info-value">@{user?.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Auth method</span>
            <span className="info-value">Cookie-based JWT</span>
          </div>
          <div className="info-row">
            <span className="info-label">API host</span>
            <span className="info-value mono" style={{ fontSize: 12 }}>api.freeapi.app</span>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="security-card danger-card">
        <div className="security-card-head">
          <div className="security-card-icon icon-red"><IconAlert /></div>
          <div>
            <p className="security-card-title">Danger Zone</p>
            <p className="security-card-desc">Irreversible account actions</p>
          </div>
        </div>
        <div className="security-card-body">
          <p className="danger-desc">
            Signing out will invalidate your current session and clear all authentication cookies from your browser.
          </p>
          <button
            id="security-logout-btn"
            className="btn btn-danger"
            onClick={onLogout}
            disabled={logoutLoading}
            style={{ width: 'auto', paddingInline: 20 }}
          >
            {logoutLoading ? <IconSpin /> : <IconLogout />}
            Sign out of account
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export function Dashboard() {
  const { user, loading, logout } = useAuth();
  const toast = useToast();
  const [activeSection, setActiveSection] = useState('profile');
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      toast.success('You have been signed out.');
    } catch (err) {
      toast.error(err.message || 'Logout failed');
    } finally {
      setLogoutLoading(false);
    }
  };

  const navItems = [
    { id: 'profile', label: 'My Profile', icon: <IconUser /> },
    { id: 'security', label: 'Security', icon: <IconShield /> },
  ];

  const sectionTitles = {
    profile: 'My Profile',
    security: 'Security',
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo-icon"><IconLock /></div>
          <span className="sidebar-logo-text">AuthVault</span>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-label">Account</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item${activeSection === item.id ? ' active' : ''}`}
              onClick={() => setActiveSection(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="sidebar-bottom">
          <div className="user-row">
            <div className="user-avatar">{initials(user)}</div>
            <div className="user-row-info">
              <p className="user-row-name">{user?.username || '…'}</p>
              <p className="user-row-email">{user?.email || '…'}</p>
            </div>
            <button
              id="sidebar-logout-btn"
              className="logout-icon-btn"
              onClick={handleLogout}
              disabled={logoutLoading}
              title="Sign out"
              aria-label="Sign out"
            >
              {logoutLoading ? <IconSpin /> : <IconLogout />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        {/* Topbar */}
        <div className="topbar">
          <h2 className="topbar-title">{sectionTitles[activeSection]}</h2>
          <div className="topbar-badge">
            <span className="role-pill">{user?.role || 'USER'}</span>
            <div className="user-avatar" style={{ width: 32, height: 32, fontSize: 13 }}>
              {initials(user)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content-area">
          {loading ? (
            <Skeleton />
          ) : activeSection === 'profile' ? (
            <ProfileSection user={user} />
          ) : (
            <SecuritySection
              user={user}
              onLogout={handleLogout}
              logoutLoading={logoutLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
}
