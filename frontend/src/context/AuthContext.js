/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
