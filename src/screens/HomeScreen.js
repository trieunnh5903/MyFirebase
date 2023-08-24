/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import ButtonCustom from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
const HomeScreen = ({navigation}) => {
  const {logout, user} = useContext(AuthContext);
  console.log(user);
  return (
    <View style={{flex: 1}}>
      {/* add button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPost')}
        style={{
          width: 60,
          height: 60,
          borderRadius: 60,
          backgroundColor: '#3b5998',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>

      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black', fontSize: 18}}>
          Hello {user?.email || user?.phoneNumber}
        </Text>
        <ButtonCustom
          onPress={logout}
          style={{paddingHorizontal: 10}}
          label={'Logout'}
        />
      </View>
      <View style={{padding: 20}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            padding: 10,
            borderRadius: 3,
          }}>
          <Text style={{color: 'black', marginBottom: 5}}>Title</Text>
          <Image
            style={{width: '100%', height: 200}}
            source={{
              uri: 'https://images.unsplash.com/photo-1528834342297-fdefb9a5a92b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
