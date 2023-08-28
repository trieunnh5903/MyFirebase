/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const InputText = ({placeholder = '', value, onChangeText, iconName}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Icon
        name={iconName}
        color={'black'}
        size={24}
        style={{paddingHorizontal: 15}}
      />
      <TextInput
        style={{borderLeftWidth: 1, color: 'black', paddingLeft: 10, flex: 1}}
        value={value}
        placeholderTextColor={'gray'}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </KeyboardAvoidingView>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
