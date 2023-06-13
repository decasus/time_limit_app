/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import PushNotification, {Importance} from "react-native-push-notification";

AppRegistry.registerComponent(appName, () => App);

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish();
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:**/

   requestPermissions: Platform.OS === 'ios'
});

PushNotification.createChannel(
  {
    channelId: "general", // (required)
    channelName: "General Channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

