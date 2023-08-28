import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import ButtonCustom from '../components/ButtonCustom';
import {AuthContext} from '../utils/AuthProvider';
const PhoneAuth = ({navigation}) => {
  const {setSkipOTP} = useContext(AuthContext);
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      console.log('User is auto-verified:', user.uid);
      setSkipOTP(true);
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(numPhone) {
    const confirmation = await auth().signInWithPhoneNumber(numPhone);
    console.log('Verification code sent.');
    // setIsLoading(false);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      console.log('Phone verification successful!');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const handlerSendCodePress = () => {
    if (phoneNumber.length < 10) {
      return;
    }
    setIsLoading(true);
    // chuyen sang ma quoc te +84
    let phoneNumberConvert = '';
    if (phoneNumber.charAt(0) === '0') {
      phoneNumberConvert = '+84' + phoneNumber.slice(1);
    } else {
      phoneNumberConvert = phoneNumber;
    }
    signInWithPhoneNumber(phoneNumberConvert);
  };
  if (!confirm) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', top: 24, left: 24}}>
          <Text style={{color: 'black', fontSize: 18}}>OTP Authentication</Text>
        </View>
        <Text style={{color: 'black'}}>Please enter your phone number</Text>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor={'gray'}
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <ButtonCustom
          style={{padding: 10}}
          onPress={() => handlerSendCodePress()}
          label={isLoading === false ? 'Send code' : 'Loading...'}
        />
        <ButtonCustom
          style={{marginTop: 10}}
          onPress={() => setSkipOTP(true)}
          label={'Skip'}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        placeholderTextColor={'black'}
        placeholder="Enter code..."
        style={styles.input}
        value={code}
        onChangeText={text => setCode(text)}
      />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    marginVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    color: 'black',
  },
});
