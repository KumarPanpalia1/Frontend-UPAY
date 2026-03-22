import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('upay_user')) || null
  );

  const login = (userData, token) => {
    localStorage.setItem('upay_user', JSON.stringify(userData));
    localStorage.setItem('upay_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('upay_user');
    localStorage.removeItem('upay_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);