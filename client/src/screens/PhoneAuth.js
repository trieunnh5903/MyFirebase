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
const PhoneAuth = () => {
  const {setSkipOTP} = useContext(AuthContext);
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle the button press
  async function signInWithPhoneNumber(numPhone) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(numPhone);
      console.log('Verification code sent.');
      setIsLoading(false);
      setConfirm(confirmation);
    } catch (error) {
      console.log('signInWithPhoneNumber', error.message);
    }
  }

  async function hanndleConfirmCode() {
    try {
      await confirm.confirm(code);
      console.log('Phone verification successful!');
      setSkipOTP(true);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const handlerSendCodePress = async () => {
    if (phoneNumber.length < 10) {
      return;
    }
    setIsLoading(true);
    // firebase chỉ chấp nhận số có đầu quốc tê (+84) -> chuyen sdt có ma quoc te +84
    let phoneNumberConvert = '';
    if (phoneNumber.charAt(0) === '0') {
      phoneNumberConvert = '+84' + phoneNumber.slice(1);
    } else {
      phoneNumberConvert = phoneNumber;
    }
    await signInWithPhoneNumber(phoneNumberConvert);
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
      <Button title="Confirm Code" onPress={() => hanndleConfirmCode()} />
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
