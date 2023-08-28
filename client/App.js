import {StyleSheet, Alert, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './src/utils/AuthProvider';
import RootStack from './src/navigation/RootStack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    // lắng nghe tin nhắn được gửi tới và device đang ở trạng thái foreground
    // không giống như setBackgroundMessageHandler onRemove  sẽ không push notification, ta cần sử dụng notifee để hiện thị thông báo
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'onMessage: A new FCM message arrived!',
        JSON.stringify(remoteMessage),
      );
    });

    return unsubscribe;
  }, []);
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
