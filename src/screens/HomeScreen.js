/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../navigation/AuthProvider';
import ButtonCustom from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = ({navigation}) => {
  const {logout, user} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let data = [];
    const unsubscribe = firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      // onSnapshot chứa callbacks trả về kq và 1 callbacks xử lí error
      .onSnapshot(querySnapshot => {
        // câu lệnh chỉ chạy onsnapshot mỗi khi data thay đổi vì vậy cần set data = [] để tránh lặp dữ liệu
        // toán tử spread không xử lí trùng dữ liệu
        data = [];
        querySnapshot.forEach(docs => {
          if (docs.exists) {
            // với các dữ liệu lồng sâu thì destructuring sẽ không có tác dụng, ta sử dụng toán tử chấm ở dưới
            let seconds = docs.get('createdAt.seconds');
            const {comments, imageUrl, likes, title, userId} = docs.data();
            data = [
              ...data,
              {
                id: docs.id,
                title,
                imageUrl,
                comments,
                //ngay duoc tao bang firestore.FieldValue.serverTimestamp() se tra ve 1 object chứa ngày dưới dạng nano seconds và seconds
                createdAt: seconds,
                likes,
                userId,
              },
            ];
          }
        });
        setPosts(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* add button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddPost')}
        style={{
          zIndex: 10,
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

      {/* ten nguoi dung */}
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black', fontSize: 18, flex: 1}}>
          Hello {user?.email || user?.phoneNumber}
        </Text>
        {/* nut logout */}
        <ButtonCustom
          onPress={logout}
          labelColor={'#4867aa'}
          style={{
            marginHorizontal: 10,
            backgroundColor: '#e6eaf4',
          }}
          label={'Logout'}
        />
      </View>
      <FlatList
        contentContainerStyle={{padding: 20}}
        data={posts}
        keyExtractor={item => item.id + ''}
        renderItem={({item, index}) => {
          const date = new Date(item.createdAt * 1000);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return (
            <View style={index !== 0 && {marginTop: 20}} key={item.id}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: 10,
                  borderRadius: 3,
                }}>
                <Text style={{color: 'black', marginBottom: 5}}>
                  {item.title}
                </Text>
                <Text style={{color: 'black', marginBottom: 5}}>
                  Created at {formattedDate}
                </Text>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri: item.imageUrl,
                  }}
                />
              </View>
            </View>
          );
        }}
      />
      {/* <ScrollView contentContainerStyle={{padding: 20}}>
        {posts.map((post, index) => {
          return (
            <View style={index !== 0 && {marginTop: 20}} key={post.id}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: 10,
                  borderRadius: 3,
                }}>
                <Text style={{color: 'black', marginBottom: 5}}>
                  {post.title}
                </Text>
                <Text style={{color: 'black', marginBottom: 5}}>
                  {post.createdAt}
                </Text>
                <Image
                  style={{width: '100%', height: 200}}
                  source={{
                    uri: post.imageUrl,
                  }}
                />
              </View>
            </View>
          );
        })}
      </ScrollView> */}

      {/* <View>
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
      </View> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
