import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

//* khi người dùng thay đổi (logout và login) token vẫn giữ nguyên, vì vậy token sẽ lưu vào db bất chấp việc user có trùng token hay không
//  vì vậy khi gửi nofication cho một người dùng chỉ định, ta nên kèm id của người dùng vào notification, sau đó so sánh với id người dùng ở client,
//  có một cách khác hay sử dụng là xóa token khi logout và tạo token khi login, đi kèm luôn phải cập nhật lên db.
//* xử lí token củ:
// + khi lưu token vào db nên lưu cả thời gian tạo token (timestamp), theo doc firebse sau 2 tháng token được coi là cũ -> nên xóa
// Vd:
// exports.pruneTokens = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
//   // Get all documents where the timestamp exceeds is not within the past month
//   const staleTokensResult = await admin.firestore().collection('fcmTokens')
//       .where("timestamp", "<", Date.now() - EXPIRATION_TIME)
//       .get();
//   // Delete devices with stale tokens
//   staleTokensResult.forEach(function(doc) { doc.ref.delete(); });
// });
// + khi gửi notification gặp lỗi UNREGISTERED or INVALID_ARGUMENT -> token đã delete phía client -> nên xóa
//  Vd:
// Registration token comes from the client FCM SDKs
// const registrationToken = 'YOUR_REGISTRATION_TOKEN';

//  const message = {
//  data: {
//      // Information you want to send inside of notification
//  },
//  token: registrationToken
//  };

//  // Send message to device with provided registration token
//  getMessaging().send(message)
//  .then((response) => {
//      // Response is a message ID string.
//  })
//  .catch((error) => {
//      // Delete token for user if error code is UNREGISTERED or INVALID_ARGUMENT.
//      if (errorCode == "messaging/registration-token-not-registered") {
//          // If you're running your own server, call API to delete the token for the user

//          // Example shown below with Firestore
//          // Get user ID from Firebase Auth or your own server
//          Firebase.firestore.collection("fcmTokens").document(user.uid).delete()
//      }
//  });

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
      console.log('save token to firebase successfully');
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
