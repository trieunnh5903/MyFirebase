import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [skipOTP, setSkipOTP] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        setSkipOTP,
        skipOTP,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
