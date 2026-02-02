import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { adminLogin, userLogin, userRegister } from '../services/flightsService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  // Admin authentication
  const adminLoginHandler = async (username, password) => {
    const res = await adminLogin(username, password);
    if (res?.token) {
      localStorage.setItem('adminToken', res.token);
      setAdminToken(res.token);
      return true;
    }
    return false;
  };

  // User authentication
  const userLoginHandler = async (email, password) => {
    const res = await userLogin(email, password);
    if (res?.token) {
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('user', JSON.stringify(res.user || { email }));
      setUserToken(res.token);
      setUser(res.user || { email });
      return true;
    }
    return false;
  };

  const userRegisterHandler = async (userData) => {
    const res = await userRegister(userData);
    if (res?.token) {
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('user', JSON.stringify(res.user || { email: userData.email }));
      setUserToken(res.token);
      setUser(res.user || { email: userData.email });
      return true;
    }
    return false;
  };

  const logout = (type = 'all') => {
    if (type === 'admin' || type === 'all') {
      localStorage.removeItem('adminToken');
      setAdminToken(null);
    }
    if (type === 'user' || type === 'all') {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      setUserToken(null);
      setUser(null);
    }
  };

  const isAdminAuthenticated = !!adminToken;
  const isUserAuthenticated = !!userToken;
  const isAuthenticated = isAdminAuthenticated; // For backward compatibility with admin routes

  useEffect(() => {
    // Set axios default headers
    if (adminToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
    } else if (userToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    } else {
      // Clear authorization header if no token
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [adminToken, userToken]);

  return (
    <AuthContext.Provider
      value={{
        adminToken,
        userToken,
        user,
        isAdminAuthenticated,
        isUserAuthenticated,
        isAuthenticated, // For backward compatibility
        adminLogin: adminLoginHandler,
        userLogin: userLoginHandler,
        userRegister: userRegisterHandler,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
