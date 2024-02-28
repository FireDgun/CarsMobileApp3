import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthProvider } from "./src/providers/AuthContext";
import AppRouter from "./AppRouter";
import { ChatsProvider } from "./src/providers/ChatsProvider";
import { UsersProvider } from "./src/providers/UsersProvider";
import { RidesProvider } from "./src/providers/RidesContext";
import { Modal, StyleSheet, View, Text } from "react-native";
import GooglePlacesInput from "./src/components/GooglePlacesInput";
import ModalProvider from "./src/providers/ModalProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UsersProvider>
      <AuthProvider>
        <ChatsProvider>
          <RidesProvider>
            <ContactsProvider>
              <NavigationContainer>
                <ModalProvider>
                  <AppRouter />
                </ModalProvider>
              </NavigationContainer>
            </ContactsProvider>
          </RidesProvider>
        </ChatsProvider>
      </AuthProvider>
    </UsersProvider>
  );
}
