import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { Dashboard } from './pages/Dashboard';

// Full-screen spinner shown while checking existing session
function GlobalLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-page)',
      flexDirection: 'column',
      gap: 16,
    }}>
      <svg
        style={{ animation: 'spin 0.8s linear infinite', color: 'var(--primary)' }}
        width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Loading…</p>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  if (loading) return <GlobalLoader />;
  if (user) return <Dashboard />;

  return authMode === 'login'
    ? <LoginPage onSwitch={() => setAuthMode('register')} />
    : <RegisterPage onSwitch={() => setAuthMode('login')} />;
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ToastProvider>
  );
}
