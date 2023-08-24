import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState, useEffect, useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from './AuthProvider';
import HomeScreen from '../screens/HomeScreen';
import auth from '@react-native-firebase/auth';
import PhoneAuth from '../screens/PhoneAuth';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {user, setUser} = useContext(AuthContext);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = useCallback(
    response => {
      setUser(response);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing, setUser],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user == null ? (
        <>
          <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
