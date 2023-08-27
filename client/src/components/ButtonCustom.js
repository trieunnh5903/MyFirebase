import {ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import React from 'react';

const ButtonCustom = ({
  onPress,
  label,
  style,
  labelColor,
  isLoading = false,
}) => {
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
        ...style,
      }}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text
          style={{
            color: labelColor || 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonCustom;
