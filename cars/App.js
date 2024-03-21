import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthProvider, useAuth } from "./src/providers/AuthContext";
import AppRouter from "./AppRouter";
import { ChatsProvider } from "./src/providers/ChatsProvider";
import { UsersProvider, useUsersContext } from "./src/providers/UsersProvider";
import { RidesProvider } from "./src/providers/RidesContext";
import { Modal, StyleSheet, View, Text } from "react-native";
import GooglePlacesInput from "./src/components/GooglePlacesInput";
import ModalProvider from "./src/providers/ModalProvider";
import { useEffect, useState } from "react";

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
