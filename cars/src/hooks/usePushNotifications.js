import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { EXPO_PROJECT_ID } from "@env";

// Notification handling setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const usePushNotifications = (user, saveUserExpoPushToken) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    let isSubscribed = false; // Track whether listeners were added

    if (user?.name) {
      registerForPushNotificationsAsync(user, saveUserExpoPushToken).then(
        (token) => {
          setExpoPushToken(token);
        }
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // Handle response here
        });

      isSubscribed = true; // Indicate that listeners were added
    }

    return () => {
      if (isSubscribed) {
        // Only remove subscriptions if they were added
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user, saveUserExpoPushToken]);

  return { expoPushToken, notification };
};

async function registerForPushNotificationsAsync(user, saveUserExpoPushToken) {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Please enable notifications for the app");
    return;
  }

  const projectId = EXPO_PROJECT_ID;
  let token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

  const existingTokens = user.expoPushTokens || [];
  if (!existingTokens.includes(token)) {
    const updatedTokens = [...existingTokens, token];
    await saveUserExpoPushToken(user.uid, updatedTokens);
  }

  return token;
}

export default usePushNotifications;
