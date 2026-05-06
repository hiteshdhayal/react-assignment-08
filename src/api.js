const BASE = 'https://api.freeapi.app/api/v1/users';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data;
}

export const api = {
  register: (body) =>
    request('/register', { method: 'POST', body: JSON.stringify(body) }),

  login: (body) =>
    request('/login', { method: 'POST', body: JSON.stringify(body) }),

  logout: () =>
    request('/logout', { method: 'POST' }),

  currentUser: () =>
    request('/current-user'),
};
