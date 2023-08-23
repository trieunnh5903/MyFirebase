/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function isValidEmail(emailInput) {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(emailInput);
  }
  const handleLoginPress = () => {
    if (email && password) {
      if (isValidEmail(email)) {
        login(email, password);
      } else {
        console.log('Please enter a valid email');
      }
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 10}}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{borderRadius: 10, borderWidth: 1, height: 50}}
        placeholder="email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={{borderRadius: 10, marginTop: 10, borderWidth: 1, height: 50}}
        placeholder="password"
      />
      <TouchableOpacity
        onPress={handleLoginPress}
        style={{
          borderRadius: 10,
          marginTop: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'violet',
        }}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        style={{
          borderRadius: 10,
          marginTop: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
