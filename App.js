import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/navigation/AuthProvider';
import RootStack from './src/navigation/RootStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  GoogleSignin.configure({
    webClientId:
      '32746831895-q7jo64f3p95mhm0ccovj8pl7h8ojjdjh.apps.googleusercontent.com',
  });
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
