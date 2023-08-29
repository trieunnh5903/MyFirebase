import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from 'react-native';
import React, {useContext, memo, useEffect, useState} from 'react';
import {AuthContext} from '../utils/AuthProvider';
import ButtonCustom from '../components/ButtonCustom';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {
  getFcmToken,
  requestUserPermission,
  saveTokenToDatabase,
} from '../utils/firebase/ClouldMessagingHelper';
import {logout} from '../utils/firebase/AuthencationHelper';
import {
  deleteImageByUrl,
  deletePostById,
  addUserToFirestore,
  getAllPost,
} from '../utils/firebase/FirestoreHepler';

const HomeScreen = ({navigation}) => {
  const {setSkipOTP} = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const user = auth().currentUser;
  useEffect(() => {
    // thêm người dùng vào firebase
    addUserToFirestore();
    //xin quyền push notifications
    requestUserPermission();
    //kiểm tra token devices
    getFcmToken();
    //lấy danh sách bài post 
    const unsubscribe = getAllPost(data => {
      setPosts(data);
    });
    return () => {
      unsubscribe();
      // Được gọi khi mã thông báo đăng ký mới được tạo cho thiết bị. Ví dụ: sự kiện này có thể xảy ra khi mã thông báo hết hạn hoặc khi máy chủ vô hiệu hóa mã thông báo.
      messaging().onTokenRefresh(token => {
        saveTokenToDatabase(token);
      });
    };
  }, []);

  const onDeletePostPress = async (postId, imageUrl) => {
    try {
      // xác nhận người dùng xóa
      Alert.alert('Delete post', 'Are you sure you want to delete?', [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'default',
          onPress: async () => {
            await deletePostById(postId);
            await deleteImageByUrl(imageUrl);
            Alert.alert('Delete post', 'Post deleted successfully');
          },
        },
      ]);
    } catch (error) {
      console.log('onDeletePostPress', error.message);
    }
  };

  const handleLogoutPress = async () => {
    await logout();
    setSkipOTP(false);
  };

  const PostItem = memo(({item, index, formattedDate}) => {
    return (
      <View
        style={{
          marginTop: index !== 0 ? 20 : 0,
          backgroundColor: '#e6eaf4',
          borderColor: 'gray',
          padding: 10,
          borderRadius: 3,
        }}>
        {/* title */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
            {item.title}
          </Text>
          {/* nut xoa */}
          <TouchableOpacity
            onPress={() => onDeletePostPress(item.id, item.imageUrl)}>
            <Icon name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* created at */}
        <Text style={{color: 'black', marginBottom: 5}}>
          Created at {formattedDate}
        </Text>
        {/* image */}
        <FastImage
          style={{width: '100%', height: 200}}
          source={{
            uri: item.imageUrl,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  });

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
          onPress={handleLogoutPress}
          labelColor={'#4867aa'}
          style={{
            marginHorizontal: 10,
            backgroundColor: '#e6eaf4',
          }}
          label={'Logout'}
        />
      </View>
      {/* danh sách bài post */}
      <FlatList
        style={{marginTop: 20}}
        contentContainerStyle={{padding: 20, paddingTop: 0}}
        data={posts}
        keyExtractor={item => item.id + ''}
        renderItem={({item, index}) => {
          const date = new Date(item.createdAt * 1000);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          return (
            <PostItem item={item} index={index} formattedDate={formattedDate} />
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
