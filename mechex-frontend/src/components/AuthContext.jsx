import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const login = (userType) => {
    setIsLoggedIn(true);
    setUserType(userType);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  const authContextValue = {
    isLoggedIn,
    userType,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
