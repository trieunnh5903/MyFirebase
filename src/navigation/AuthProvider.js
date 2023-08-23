import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const register = async (email, password) => {
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account signed in!');
        });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('That email address is not exsisted!');
      }

      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await auth()
        .signOut()
        .then(() => {
          console.log('User account signed out!');
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
