/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonCustom from '../components/ButtonCustom';
const AddPost = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, paddingHorizontal: 20}}>
      <Text style={{fontSize: 20, color: 'black', marginVertical: 20}}>
        AddPost
      </Text>
      <TouchableOpacity
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
      <TextInput
        style={{flex: 1, color: 'black'}}
        textAlignVertical="top"
        placeholderTextColor={'black'}
        multiline={true}
        placeholder="What are you thinking?"
      />
      <ButtonCustom style={{marginVertical: 20}} label={'Post'} />
    </KeyboardAvoidingView>
  );
};

export default AddPost;

const styles = StyleSheet.create({});
