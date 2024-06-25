import React, { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Dashboard from "./src/screens/Dashboard";
import Details from "./src/screens/Details";
import StartNewChat from "./src/chats/StartNewChat";
import ChatWindow from "./src/chats/ChatWindow";
import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthContext, useAuth } from "./src/providers/AuthContext";
import StartNewGroupChat from "./src/chats/StartNewGroupChat";
import StartNewChatGroupDetails from "./src/chats/StartNewChatGroupDetails";
import ProfilePage from "./src/profile/ProfilePage";
import PostNewRide from "./src/rides/postRide/PostNewRide";
import PostTripRide from "./src/rides/postRide/trip/PostTripRide";
import PostLineRide from "./src/rides/postRide/lines/PostLineRide";
import PostJumpRide from "./src/rides/postRide/jumps/PostJumpRide";
import PostAirportRide from "./src/rides/postRide/airport/PostAirportRide";
import RidePreviewPage from "./src/rides/shareRide/preview/RidePreviewPage";
import MySellRides from "./src/rides/myRides/sellRide/MySellRides";
import MyBuyRides from "./src/rides/myRides/buyRide/MyBuyRides";
import ShareRidePage from "./src/rides/shareRide/share/ShareRidePage";
import usePushNotifications from "./src/hooks/usePushNotifications";
import { useUsersContext } from "./src/providers/UsersProvider";

const Stack = createStackNavigator();

export default function AppRouter() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { saveUserExpoPushToken } = useUsersContext();
  usePushNotifications(user, saveUserExpoPushToken, navigation);
  return (
    <Stack.Navigator initialRouteName={user ? "Dashboard" : "Login"}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartNewChat"
        component={StartNewChat}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChatWindow"
        component={ChatWindow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartNewGroupChat"
        component={StartNewGroupChat}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="StartNewChatGroupDetails"
        component={StartNewChatGroupDetails}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostNewRide"
        component={PostNewRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostTripRide"
        component={PostTripRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostLineRide"
        component={PostLineRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostJumpRide"
        component={PostJumpRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostAirportRide"
        component={PostAirportRide}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RidePreviewPage"
        component={RidePreviewPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShareRidePage"
        component={ShareRidePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
