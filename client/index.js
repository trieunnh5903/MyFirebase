/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// lắng nghe khi có thông báo đến ở trạng thái Background & Quit: setBackgroundMessageHandler
// ta không thể update ui ở đây, ta có thể thực hiện các network requests(call api), hoặc cập nhật async storage
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('setBackgroundMessageHandler: Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => App);
