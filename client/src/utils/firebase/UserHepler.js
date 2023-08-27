import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const userCollection = firestore().collection('users');

export const addUserToFirestore = () => {
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
  userCollection
    .doc(uid)
    .set({
      displayName,
      email,
      emailVerified,
      isAnonymous,
      creationTime,
      lastSignInTime,
      phoneNumber,
      photoURL,
    })
    .then(() => console.log('add user to firestore successfully'))
    .catch(err => console.error('addUserToFirestore' + err));
};
