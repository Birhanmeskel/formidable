import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('formidable_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      localStorage.removeItem('formidable_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      throw new Error('Invalid email or password');
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('formidable_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('formidable_user');
  };

  const isAdmin = user?.role === 'admin';
  const isReviewer = user?.role === 'reviewer' || isAdmin;
  const isFounder = user?.role === 'founder';
  const isInvestor = user?.role === 'investor';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin, isReviewer, isFounder, isInvestor }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
