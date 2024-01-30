import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/Login";
import Dashboard from "./src/Dashboard";
import Details from "./src/Details";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import StartNewChat from "./src/chats/StartNewChat";
import ContactsProvider from "./src/providers/ContactsProvider";
import ChatWindow from "./src/chats/ChatWindow";
import { AuthProvider } from "./src/providers/AuthContext";
import AppRouter from "./AppRouter";
import { ChatsProvider } from "./src/providers/ChatsProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <ChatsProvider>
        <ContactsProvider>
          <NavigationContainer>
            <AppRouter />
          </NavigationContainer>
        </ContactsProvider>
      </ChatsProvider>
    </AuthProvider>
  );
}
