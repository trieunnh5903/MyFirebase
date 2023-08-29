/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  View,
  Platform,
  Image,
  Alert,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonCustom from '../components/ButtonCustom';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {addImageToStorage} from '../utils/firebase/CloudStorageHelper';
import {addPostToFirestore} from '../utils/firebase/FirestoreHepler';

const AddPost = () => {
  const [filePatch, setFilePatch] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const {uid} = auth().currentUser;
  //image picker lay anh
  const onGetImagePress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (result.didCancel) {
      console.log('User cancelled camera picker');
      return;
    } else if (result.errorCode === 'camera_unavailable') {
      Alert.alert('Camera not available on device');
      return;
    } else if (result.errorCode === 'permission') {
      Alert.alert('Permission not satisfied');
      return;
    } else if (result.errorCode === 'others') {
      Alert.alert(result.errorMessage);
      return;
    }
    console.log('base64 -> ', result.assets[0].base64);
    console.log('uri -> ', result.assets[0].uri);
    console.log('width -> ', result.assets[0].width);
    console.log('height -> ', result.assets[0].height);
    console.log('fileSize -> ', result.assets[0].fileSize);
    console.log('type -> ', result.assets[0].type);
    console.log('fileName -> ', result.assets[0].fileName);
    setFilePatch(result.assets[0]);
  };

  const onPostPress = async () => {
    try {
      Keyboard.dismiss();
      if (title && filePatch) {
        setUploading(true);
        const imageUrl = await addImageToStorage(filePatch.uri);
        console.log(imageUrl);
        if (imageUrl) {
          await addPostToFirestore({
            title: title,
            imageUrl: imageUrl,
            createdAt: firestore.FieldValue.serverTimestamp(),
            userId: uid,
            likes: null,
            comments: null,
          });
          Alert.alert('Post added!');
        }
      }
    } catch (error) {
      console.log('onPostPress', error.message);
    } finally {
      setFilePatch(null);
      setTitle('');
      setUploading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontSize: 20, color: 'black', marginVertical: 20}}>
        AddPost
      </Text>
      {/* image */}
      {filePatch ? (
        <View style={{width: '100%', height: 200}}>
          <Image style={{flex: 1}} source={{uri: filePatch.uri}} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => onGetImagePress()}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 3,
          }}>
          <Icon name="plus" size={24} color="gray" />
          <Text style={{color: 'black'}}>Add image</Text>
        </TouchableOpacity>
      )}

      {/* title */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{flex: 1, color: 'black'}}
        textAlignVertical="top"
        placeholderTextColor={'black'}
        multiline={true}
        placeholder="What are you thinking?"
      />
      <ButtonCustom
        isLoading={uploading}
        onPress={onPostPress}
        style={{marginVertical: 20}}
        label={'Post'}
      />
    </KeyboardAvoidingView>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
