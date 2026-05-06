import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

// ── Shared icons ──────────────────────────────────────────────────────────────
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);
const IconSpin = () => (
  <svg className="spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// ── PasswordInput ─────────────────────────────────────────────────────────────
function PasswordInput({ id, value, onChange, placeholder, autoComplete, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`field-input-wrap has-right-action`}>
      <span className="field-icon"><IconLock /></span>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`field-input${error ? ' error' : ''}`}
      />
      <button
        type="button"
        className="field-right-action"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        {show ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}

// ── AuthLogo ──────────────────────────────────────────────────────────────────
function AuthLogo() {
  return (
    <div className="auth-logo">
      <div className="auth-logo-icon">
        <IconLock />
      </div>
      <span className="auth-logo-text">AuthVault</span>
    </div>
  );
}

// ── LoginPage ─────────────────────────────────────────────────────────────────
export function LoginPage({ onSwitch }) {
  const { login } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await login({ username: form.username.trim(), password: form.password });
      toast.success('Welcome back!');
    } catch (err) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <AuthLogo />
      <div className="auth-card">
        <div className="auth-card-header">
          <h1 className="auth-card-title">Sign in to AuthVault</h1>
          <p className="auth-card-subtitle">
            No account?{' '}
            <button onClick={onSwitch} id="switch-to-register">Sign up</button>
          </p>
        </div>
        <div className="auth-card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-stack">
              {/* Username */}
              <div className="field">
                <label className="field-label" htmlFor="login-username">Username</label>
                <div className="field-input-wrap">
                  <span className="field-icon"><IconUser /></span>
                  <input
                    id="login-username"
                    type="text"
                    value={form.username}
                    onChange={set('username')}
                    placeholder="johndoe"
                    autoComplete="username"
                    className={`field-input${errors.username ? ' error' : ''}`}
                  />
                </div>
                {errors.username && <span className="field-error">{errors.username}</span>}
              </div>

              {/* Password */}
              <div className="field">
                <label className="field-label" htmlFor="login-password">Password</label>
                <PasswordInput
                  id="login-password"
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  error={errors.password}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              <button
                id="login-submit"
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ marginTop: 4 }}
              >
                {loading ? <IconSpin /> : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="auth-footer">
        Secured by <strong>FreeAPI</strong> · <a href="https://freeapi.app" target="_blank" rel="noreferrer">freeapi.app</a>
      </p>
    </div>
  );
}

// ── RegisterPage ──────────────────────────────────────────────────────────────
export function RegisterPage({ onSwitch }) {
  const { register } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'USER' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = 'Username is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'At least 6 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast.success('Account created! Please sign in.');
      onSwitch();
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <AuthLogo />
      <div className="auth-card">
        <div className="auth-card-header">
          <h1 className="auth-card-title">Create your account</h1>
          <p className="auth-card-subtitle">
            Already have one?{' '}
            <button onClick={onSwitch} id="switch-to-login">Sign in</button>
          </p>
        </div>
        <div className="auth-card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-stack">
              {/* Username */}
              <div className="field">
                <label className="field-label" htmlFor="reg-username">Username</label>
                <div className="field-input-wrap">
                  <span className="field-icon"><IconUser /></span>
                  <input
                    id="reg-username"
                    type="text"
                    value={form.username}
                    onChange={set('username')}
                    placeholder="johndoe"
                    autoComplete="username"
                    className={`field-input${errors.username ? ' error' : ''}`}
                  />
                </div>
                {errors.username && <span className="field-error">{errors.username}</span>}
              </div>

              {/* Email */}
              <div className="field">
                <label className="field-label" htmlFor="reg-email">Email address</label>
                <div className="field-input-wrap">
                  <span className="field-icon"><IconMail /></span>
                  <input
                    id="reg-email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`field-input${errors.email ? ' error' : ''}`}
                  />
                </div>
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className="field">
                <label className="field-label" htmlFor="reg-password">Password</label>
                <PasswordInput
                  id="reg-password"
                  value={form.password}
                  onChange={set('password')}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  error={errors.password}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>

              {/* Role */}
              <div className="field">
                <label className="field-label" htmlFor="reg-role">Role</label>
                <div className="field-input-wrap">
                  <span className="field-icon"><IconUsers /></span>
                  <select
                    id="reg-role"
                    value={form.role}
                    onChange={set('role')}
                    className="field-input field-select"
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <span className="select-chevron"><IconChevron /></span>
                </div>
              </div>

              <button
                id="register-submit"
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ marginTop: 4 }}
              >
                {loading ? <IconSpin /> : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="auth-footer">
        Secured by <strong>FreeAPI</strong> · <a href="https://freeapi.app" target="_blank" rel="noreferrer">freeapi.app</a>
      </p>
    </div>
  );
}
