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
import InputText from '../components/InputText';
import ButtonCustom from '../components/ButtonCustom';

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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: 'white',
      }}>
      {/* input email */}
      <InputText
        value={email}
        placeholder="email"
        onChangeText={setEmail}
        iconName={'user'}
      />
      {/* input password */}
      <InputText
        value={password}
        placeholder="password"
        onChangeText={setPassword}
        iconName={'lock'}
      />
      <ButtonCustom
        style={{marginTop: 10}}
        onPress={handleRegister}
        label={'Register'}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        style={{
          borderRadius: 10,
          marginTop: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Already have account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
