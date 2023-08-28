\***\*\*\*\*\***\*\*\***\*\*\*\*\***CLOUD MESSAGING**\*\***\*\***\*\***\*\*\*\***\*\***\*\***\*\***

- khi người dùng thay đổi (logout và login) token vẫn giữ nguyên, vì vậy token sẽ lưu vào db bất chấp việc user có trùng token hay không
  vì vậy khi gửi nofication cho một người dùng chỉ định, ta nên kèm id của người dùng vào notification, sau đó so sánh với id người dùng ở client,
  có một cách khác hay sử dụng là xóa token khi logout và tạo token khi login, đi kèm luôn phải cập nhật lên db.
- xử lí token củ:

* khi lưu token vào db nên lưu cả thời gian tạo token (timestamp), theo doc firebse sau 2 tháng token được coi là cũ -> nên xóa.
  Vd:.
  exports.pruneTokens = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  // Get all documents where the timestamp exceeds is not within the past month
  const staleTokensResult = await admin.firestore().collection('fcmTokens')
  .where("timestamp", "<", Date.now() - EXPIRATION_TIME)
  .get();
  // Delete devices with stale tokens
  staleTokensResult.forEach(function(doc) { doc.ref.delete(); });
  });

* khi gửi notification gặp lỗi UNREGISTERED or INVALID_ARGUMENT -> token đã delete phía client -> nên xóa
  Vd:

  Registration token comes from the client FCM SDKs
  const registrationToken = 'YOUR_REGISTRATION_TOKEN';
  const message = {
  data: {
  // Information you want to send inside of notification
  },
  token: registrationToken
  };

  // Send message to device with provided registration token
  getMessaging().send(message)
  .then((response) => {
  // Response is a message ID string.
  })
  .catch((error) => {
  // Delete token for user if error code is UNREGISTERED or INVALID_ARGUMENT.
  if (errorCode == "messaging/registration-token-not-registered") {
  // If you're running your own server, call API to delete the token for the user
  // Example shown below with Firestore
  // Get user ID from Firebase Auth or your own server
  Firebase.firestore.collection("fcmTokens").document(user.uid).delete()
  }
  });
