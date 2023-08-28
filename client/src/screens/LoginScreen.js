import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../utils/AuthProvider';
import InputText from '../components/InputText';
import ButtonCustom from '../components/ButtonCustom';
import ButtonSocial from '../components/ButtonSocial';
import {
  login,
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '../utils/firebase/AuthencationHelper';
const LoginScreen = ({navigation}) => {
  const {setSkipOTP} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function isValidEmail(emailInput) {
    // Regular expression pattern for basic email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailInput);
  }

  const handleLoginPress = async () => {
    if (email && password) {
      if (isValidEmail(email)) {
        const response = await login(email, password);
        if (response?.user) {
          console.log('User account signed in!');
          navigation.navigate('PhoneAuth');
        }
      } else {
        console.log('Please enter a valid email');
      }
    }
  };

  const handleLoginGooglePress = async () => {
    const response = await onGoogleButtonPress();
    if (response?.user) {
      setSkipOTP(true);
    }
  };

  const handleLoginFacebookPress = async () => {
    const response = await onFacebookButtonPress();
    if (response?.user) {
      setSkipOTP(true);
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
            onPress={handleLoginGooglePress}
          />

          <ButtonSocial
            buttonTitle={'Sign In with Facebook'}
            color={'#4867aa'}
            backgroundColor={'#e6eaf4'}
            btnType={'facebook'}
            onPress={handleLoginFacebookPress}
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
        <Text style={{color: 'black'}}>Dont have account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
