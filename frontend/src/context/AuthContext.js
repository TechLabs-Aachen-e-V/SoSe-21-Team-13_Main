/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/me`,
      {
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        if (data.userId) {
          setCurrentUser(data);
        }
      });
  }, []);  

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
