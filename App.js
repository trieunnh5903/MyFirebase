import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/navigation/AuthProvider';
import RootStack from './src/navigation/RootStack';

const App = () => {
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
