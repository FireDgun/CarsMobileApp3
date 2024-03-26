import "react-native-gesture-handler";

import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthProvider } from "./src/providers/AuthContext";
import AppRouter from "./AppRouter";
import { ChatsProvider } from "./src/providers/ChatsProvider";
import { UsersProvider, useUsersContext } from "./src/providers/UsersProvider";
import { RidesProvider } from "./src/providers/RidesContext";
import ModalProvider from "./src/providers/ModalProvider";
import { NegotiationsProvider } from "./src/providers/NegotiationsProvider";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <UsersProvider>
      <AuthProvider>
        <ChatsProvider>
          <RidesProvider>
            <NegotiationsProvider>
              <ContactsProvider>
                <NavigationContainer>
                  <ModalProvider>
                    <AppRouter />
                  </ModalProvider>
                </NavigationContainer>
              </ContactsProvider>
            </NegotiationsProvider>
          </RidesProvider>
        </ChatsProvider>
      </AuthProvider>
    </UsersProvider>
  );
}
