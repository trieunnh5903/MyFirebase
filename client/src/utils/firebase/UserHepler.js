import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userCollection = firestore().collection('Users');

export const addUserToFirestore = async () => {
  try {
    //lấy current user trong auth()
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      metadata: {creationTime, lastSignInTime},
      phoneNumber,
      photoURL,
      uid,
    } = auth().currentUser;
    if (!uid) return;

    const response = await userCollection.doc(uid).get();
    if (response.exists == false) {
      console.log('user not exists in firebase');
      await userCollection.doc(uid).set({
        displayName,
        email,
        emailVerified,
        isAnonymous,
        creationTime,
        lastSignInTime,
        phoneNumber,
        photoURL,
      });
      console.log('add user to collection successfully');
    } else {
      console.log('user already in collection');
      await userCollection.doc(uid).update({
        lastSignInTime,
      });
      console.log('update lastSignInTime successfully');
    }
    // lưu user vào async storage
    // const jsonValue = JSON.stringify({
    //   displayName,
    //   email,
    //   emailVerified,
    //   isAnonymous,
    //   creationTime,
    //   lastSignInTime,
    //   phoneNumber,
    //   photoURL,
    //   uid,
    // });
    // const currentUser = await AsyncStorage.getItem('currentUser');
    // if (currentUser == null) {
    //   await AsyncStorage.setItem('currentUser', jsonValue);
    //   // lưu user vào firestore
    //   userCollection.doc(uid).set({
    //     displayName,
    //     email,
    //     emailVerified,
    //     isAnonymous,
    //     creationTime,
    //     lastSignInTime,
    //     phoneNumber,
    //     photoURL,
    //   });
    // } else {
    //   // cập nhật lần cuối đăng nhập
    //   userCollection.doc(userId).update({
    //     lastSignInTime,
    //   });
    // }
  } catch (error) {
    console.log('addUserToFirestore error: ' + error);
  }
};
