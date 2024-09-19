// frontend/src/context/AuthContext.js

import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || '';

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user: null,
    loading: true,
    isAuthenticated: false,
  });

  // Load user
  const loadUser = async () => {
    if (auth.token) {
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }

    try {
      // Implement an endpoint to get user data if needed
      // const res = await axios.get(`${API_URL}/auth/user`);
      // setAuth({ ...auth, user: res.data, isAuthenticated: true, loading: false });

      setAuth({ ...auth, isAuthenticated: true, loading: false });
    } catch (err) {
      console.error(err);
      setAuth({ ...auth, token: null, isAuthenticated: false, loading: false });
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      localStorage.setItem('token', res.data.token);
      setAuth({ ...auth, token: res.data.token, isAuthenticated: true });
      loadUser();
    } catch (err) {
      console.error(err);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      setAuth({ ...auth, token: res.data.token, isAuthenticated: true });
      loadUser();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ ...auth, token: null, user: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
