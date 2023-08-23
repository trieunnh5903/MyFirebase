/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const HomeScreen = () => {
  const {logout, user} = useContext(AuthContext);
  console.log(user);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello {user?.email}</Text>
      <TouchableOpacity
        onPress={logout}
        style={{
          borderRadius: 10,
          marginTop: 10,
          height: 50,
          width: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'violet',
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
