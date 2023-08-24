/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputText from '../components/InputText';
import ButtonCustom from '../components/ButtonCustom';
import ButtonSocial from '../components/ButtonSocial';
const LoginScreen = ({navigation}) => {
  const {login, onGoogleButtonPress} = useContext(AuthContext);
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
      {/* login btn */}
      <ButtonCustom
        style={{marginTop: 20}}
        onPress={handleLoginPress}
        label={'Login'}
      />
      {/* social button */}
      {Platform.OS === 'android' && (
        <View style={{marginTop: 30}}>
          <ButtonSocial
            buttonTitle={'Sign In with Google'}
            color={'#de4d41'}
            backgroundColor={'#f5e7fa'}
            btnType={'google'}
            onPress={() => {
              onGoogleButtonPress();
            }}
          />

          <ButtonSocial
            buttonTitle={'Sign In with Facebook'}
            color={'#4867aa'}
            backgroundColor={'#e6eaf4'}
            btnType={'facebook'}
            onPress={() => {
              console.log('google');
            }}
          />
        </View>
      )}

      {/* btn register */}
      <TouchableOpacity
        onPress={() => navigation.navigate('RegisterScreen')}
        style={{
          borderRadius: 10,
          marginTop: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Dont have account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
