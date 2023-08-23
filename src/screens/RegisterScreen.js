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

const RegisterScreen = ({navigation}) => {
  const {register} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function isValidEmail(emailInput) {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(emailInput);
  }
  const handleRegister = () => {
    if (email && password && isValidEmail(email)) {
      console.log(email, password);
      register(email, password);
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
        onPress={() => handleRegister()}
        style={{
          borderRadius: 10,
          marginTop: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'violet',
        }}>
        <Text>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{
          borderRadius: 10,
          marginTop: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
