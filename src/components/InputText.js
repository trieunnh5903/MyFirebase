import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
const InputText = ({placeholder = '', value, onChangeText, iconName}) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={24} style={{paddingHorizontal: 15}} />
      <TextInput
        style={{borderLeftWidth: 1, paddingLeft: 10}}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
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
