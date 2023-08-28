import storage from '@react-native-firebase/storage';

export const addImageToStorage = async uriImage => {
  try {
    const reference = storage().ref('photos/IMG_' + Date.now() + '.png');
    await reference.putFile(uriImage);
    return await reference.getDownloadURL();
  } catch (error) {
    console.log('addImageToStorage', error);
    return null;
  }
};
