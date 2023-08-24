import {View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

const ButtonCustom = ({onPress, label, style}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{
        borderRadius: 3,
        padding: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        ...style
      }}>
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
