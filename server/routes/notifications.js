var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* GET users listing. */
router.post("/", async function (req, res, next) {
  try {
    const { title, body, imageUrl } = req.body;
    if (!title || !body) return next();
    console.log(title);
    console.log(body);
    console.log(imageUrl);
    //lấy token từ db
    const tokens = [];
    const usersCollection = admin.firestore().collection("Users");
    const usersSnapshot = await usersCollection.get();
    usersSnapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      if (userData && userData.tokens) {
        tokens.push(...userData.tokens);
      }
    });

    const message = {
      notification: {
        imageUrl,
        title,
        body,
      },
      android: {
        notification: {
          sound: "default",
        },
      },
      tokens: tokens,
    };
    const response = await admin
      .messaging()
      // Send a message to devices subscribed to the combination of topics
      // specified by the provided condition.
      .sendEachForMulticast(message);

    //hiển thị token lỗi
    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
      console.error("Notifications failed for tokens:", failedTokens);
    }

    // hiển thị token gửi thành công
    const successToken = [];

    if (response.successCount > 0) {
      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          successToken.push(tokens[idx]);
        }
      });
    }
    console.log("Notifications success for tokens:", successToken);

    res.status(200).send({
      notification: "this is a notification",
    });
  } catch (error) {
    console.log("Error sending message:", error);
  }
});

module.exports = router;
