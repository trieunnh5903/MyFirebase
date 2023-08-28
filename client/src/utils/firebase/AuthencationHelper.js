import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import messaging from '@react-native-firebase/messaging';

export const register = async (email, password) => {
  try {
    return await auth().createUserWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error('register', error);
  }
};

export const login = async (email, password) => {
  try {
    return await auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.log('That email address is not exsisted!');
    }

    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error('login', error);
  }
};

export const onGoogleButtonPress = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return await auth().signInWithCredential(googleCredential);
    // console.log(res);
  } catch (error) {
    console.log('onGoogleButtonPress', error);
  }
};

export async function onFacebookButtonPress() {
  // Attempt login with permissions
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(facebookCredential);
    return res;
  } catch (error) {
    console.log('onFacebookButtonPress', error);
  }
}

export const logout = async () => {
  try {
    await auth().signOut();
    await messaging().deleteToken();
    console.log('Delete token current was successful!');
    console.log('User account signed out!');
  } catch (error) {
    console.error('logout', error);
  }
};
