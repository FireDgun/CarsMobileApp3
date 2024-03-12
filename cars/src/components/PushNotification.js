import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useAuth } from "../providers/AuthContext";
import { useUsersContext } from "../providers/UsersProvider";
import { EXPO_PROJECT_ID } from "@env";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function PushNotification() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { user } = useAuth();
  const { saveUserExpoPushToken } = useUsersContext();
  useEffect(() => {
    if (user?.name) {
      console.log("user");
      console.log(user);

      registerForPushNotificationsAsync(user, saveUserExpoPushToken).then(
        (token) => setExpoPushToken(token)
      );
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("notification");
          console.log(notification);
          setNotification(notification);
        });
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("response");
          console.log(response);
        });
    }

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user, saveUserExpoPushToken]);

  return <></>;
}

async function registerForPushNotificationsAsync(user, saveUserExpoPushToken) {
  let token;
  console.log("hey1");

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  console.log("hey2");

  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }
  console.log("hey3");

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  console.log("hey4");

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  console.log("hey5");

  if (finalStatus !== "granted") {
    alert("בבקשה אשר קבלת התראות באפליקציה");
    return;
  }

  const projectId = EXPO_PROJECT_ID;

  token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  console.log("hey6");

  // Assuming fetchUserExpoPushTokens and saveUserExpoPushTokens are implemented
  const existingTokens = user.expoPushTokens || [];
  console.log(token);
  console.log("token");
  console.log(existingTokens);
  if (!existingTokens.includes(token)) {
    const updatedTokens = [...existingTokens, token];
    await saveUserExpoPushToken(user.uid, updatedTokens);
  }

  return token;
}

// async function schedulePushNotification() {
//   try {
//     Zy;
//     console.log("Scheduling notification");
//     await Notifications.scheduleNotificationAsync({
//       to: "ExponentPushToken[]",
//       content: {
//         title: "You've got mail! 📬",
//         body: "Here is the notification body",
//         data: { data: "goes here" },
//       },
//       trigger: { seconds: 2 },
//     });
//     console.log("Notification scheduled");
//   } catch (e) {
//     console.log(e);
//   }
// }

// async function sendPushNotification(expoPushToken) {
//   try {
//     console.log("Sending notification");
//     const expoAccessToken = "";
//     const message = {
//       to: "ExponentPushToken[]",
//       sound: "default",
//       title: "Original Title",
//       body: "And here is the body!",
//       data: { someData: "goes here" },
//     };

//     let res = await fetch("https://exp.host/--/api/v2/push/send", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Autorization: `Bearer ${expoAccessToken}`,
//       },
//       body: JSON.stringify(message),
//     });
//     console.log(await res.json());
//     console.log("Notification sent");
//   } catch (e) {
//     console.log(e);
//   }
// }
