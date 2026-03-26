import api from './api';

export const loginUser = async ({ email, password, role }) => {
  // --- MOCK (use this until your backend is ready) ---
  const mockUsers = {
    'admin@upay.org':     { password: 'admin123', role: 'admin',     name: 'Admin User' },
    'volunteer@upay.org': { password: 'vol123',   role: 'volunteer', name: 'Volunteer User' },
  };

  const user = mockUsers[email];
  if (!user || user.password !== password || user.role !== role) {
    throw new Error('Invalid credentials. Please try again.');
  }

  return {
    token: 'mock-jwt-token',
    user:  { name: user.name, email, role: user.role },
  };

  // --- REAL API (uncomment when backend is ready) ---
  const { data } = await api.post('/auth/login', { email, password, role });
  return data;
};