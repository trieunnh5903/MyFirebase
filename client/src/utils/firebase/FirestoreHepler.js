import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const userCollection = firestore().collection('Users');

export const addUserToFirestore = async () => {
  try {
    //lấy current user trong auth()
    const {
      displayName,
      email,
      emailVerified,
      isAnonymous,
      metadata: {creationTime, lastSignInTime},
      phoneNumber,
      photoURL,
      uid,
    } = auth().currentUser;
    if (!uid) return;

    const response = await userCollection.doc(uid).get();
    if (response.exists == false) {
      console.log('user not exists in firebase');
      await userCollection.doc(uid).set({
        displayName,
        email,
        emailVerified,
        isAnonymous,
        creationTime,
        lastSignInTime,
        phoneNumber,
        photoURL,
      });
      console.log('add user to collection successfully');
    } else {
      console.log('user already in collection');
      await userCollection.doc(uid).update({
        lastSignInTime,
      });
      console.log('update lastSignInTime successfully');
    }
  } catch (error) {
    console.log('addUserToFirestore error: ' + error);
  }
};

// xóa ảnh dựa trên url ảnh
export const deleteImageByUrl = async imageUrl => {
  try {
    if (!imageUrl) {
      return;
    }
    await storage().refFromURL(imageUrl).delete();
  } catch (error) {
    console.log('deleteImageByUrl', error.message);
  }
};

// xóa post dựa trên id post
export const deletePostById = async postId => {
  try {
    if (!postId) {
      return;
    }
    await firestore().collection('Posts').doc(postId).delete();
    console.log('delete post success');
  } catch (error) {
    console.log('deletePostById', error.message);
  }
};

//lấy danh sách bài viết từ firebase
export const getAllPost = onDataChange => {
  return (
    firestore()
      .collection('Posts')
      .orderBy('createdAt', 'desc')
      // onSnapshot chứa callbacks trả về kq và 1 callbacks xử lí error
      .onSnapshot(
        querySnapshot => {
          // mỗi khi data thay đổi onSnapshot sẻ chạy
          let data = [];
          querySnapshot.forEach(docs => {
            if (docs.exists) {
              // với các dữ liệu lồng sâu thì destructuring sẽ không có tác dụng, ta sử dụng toán tử chấm ở dưới
              let seconds = docs.get('createdAt.seconds');
              const {comments, imageUrl, likes, title, userId} = docs.data();
              data.push({
                id: docs.id,
                title,
                imageUrl,
                comments,
                //ngay duoc tao bang firestore.FieldValue.serverTimestamp() se tra ve 1 object chứa ngày dưới dạng nano seconds và seconds
                createdAt: seconds,
                likes,
                userId,
              });
            }
          });
          onDataChange(data);
        },
        err => console.log('getAllPost', err.message),
      )
  );
};

export const addPostToFirestore = async data => {
  try {
    const postsCollection = firestore().collection('Posts');
    return await postsCollection.add(data);
  } catch (error) {
    console.log('addPostToFirestore', error.message);
  }
};
