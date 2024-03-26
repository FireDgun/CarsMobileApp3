import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { AppState, Platform } from "react-native";
import { EXPO_PROJECT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeResponseAsync = async (response) => {
  try {
    console.log("Storing notification response:", response);
    AsyncStorage.setItem("notificationResponse", JSON.stringify(response));
    console.log("Stored notification response:", response);
  } catch (error) {
    console.log("Error storing notification response", error);
  }
};

const resetStoredResponseAsync = async () => {
  try {
    await AsyncStorage.removeItem("notificationResponse");
  } catch (error) {
    console.log("Error removing stored notification response", error);
  }
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

const usePushNotifications = (user, saveUserExpoPushToken, navigation) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // App has come to the foreground, check for any notification response
        checkNotificationResponse();
      }
      setAppState(nextAppState);
    });

    // Initial check in case the app was opened by a notification
    checkNotificationResponse();

    return () => {
      subscription.remove();
    };
  }, [appState]);

  const checkNotificationResponse = async () => {
    let response = await Notifications.getLastNotificationResponseAsync();
    console.log("Last notification response:", response);
    if (response == null) {
      try {
        let responseJSON = await AsyncStorage.getItem("notificationResponse");
        console.log("Stored notification response:", responseJSON);
        response = JSON.parse(responseJSON);
      } catch (error) {
        console.log("Error getting stored notification response", error);
      }
    }
    console.log("Notification response:", response);
    if (response) {
      console.log(
        "Notification response:",
        response.notification.request.content.data?.chatId
      );
      navigation?.navigate("ChatWindow", {
        id: response.notification.request.content.data?.chatId,
      });
    }
    resetStoredResponseAsync();
  };

  useEffect(() => {
    let isSubscribed = false; // Track whether listeners were added

    if (user?.name) {
      registerForPushNotificationsAsync(user, saveUserExpoPushToken).then(
        (token) => {
          setExpoPushToken(token);
        }
      );
      // Notification handling setup
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false, // Show alerts only if app is not in the foreground
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received", notification);
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // Handle response here
          console.log("Notification response received:", response);
          storeResponseAsync(response);
        });

      isSubscribed = true; // Indicate that listeners were added
      console.log("Notification listeners added");
    }

    return () => {
      if (isSubscribed) {
        // Only remove subscriptions if they were added
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
        console.log("Notification listeners removed");
      }
    };
  }, [user, saveUserExpoPushToken, navigation]);

  return { expoPushToken, notification };
};

export default usePushNotifications;
