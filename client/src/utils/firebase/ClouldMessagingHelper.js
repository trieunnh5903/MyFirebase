import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export async function requestUserPermission() {
  // xin quyền POST_NOTIFICATIONS trên ios,chỉ android api 32+ mới cần xin quyền
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function saveTokenToDatabase(token) {
  try {
    // Assume user is already signed in
    const userId = auth().currentUser.uid;
    // Add the token to the users datastore
    if (userId) {
      await firestore()
        .collection('Users')
        .doc(userId)
        .update({tokens: firestore.FieldValue.arrayUnion(token)});
      console.log('update token to firebase successfully');
    }
  } catch (error) {
    console.log('saveTokenToDatabase: ' + err);
  }
}

// lấy device token
export async function getFcmToken() {
  try {
    const token = await messaging().getToken();
    console.log('token generate: ' + token);
    await saveTokenToDatabase(token);
  } catch (error) {
    console.log('getFcmToken' + error);
  }
}

export function interactionNotification() {
  // getInitialNotification, onNotificationOpenedApp là các sự kiện lắng nghe notification được ngừơi dùng mở chưa,
  // khi người dùng tương tác với thông báo hành vi mặc định là mở ứng dụng
  // lắng nghe khi người dùng nhấn vào ở trạng thái background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  // lắng nghe khi người dùng nhấn vào ở trạng thái quit
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  // lắng nghe khi có thông báo đến ở foreground: onMessage
  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
}

export function handlerOnMessageForeground() {
  return messaging().onMessage(async remoteMessage => {
    Alert.alert(
      'onMessage: A new FCM message arrived!',
      JSON.stringify(remoteMessage),
    );
  });
}
