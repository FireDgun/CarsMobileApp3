import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login";
import Dashboard from "./src/Dashboard";
import Details from "./src/Details";
import StartNewChat from "./src/chats/StartNewChat";
import ChatWindow from "./src/chats/ChatWindow";
import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthContext, useAuth } from "./src/providers/AuthContext";
import StartNewGroupChat from "./src/chats/StartNewGroupChat";
import StartNewChatGroupDetails from "./src/chats/StartNewChatGroupDetails";

const Stack = createStackNavigator();

export default function AppRouter() {
  const { user } = useAuth();

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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatWindow"
        component={ChatWindow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartNewGroupChat"
        component={StartNewGroupChat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StartNewChatGroupDetails"
        component={StartNewChatGroupDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
