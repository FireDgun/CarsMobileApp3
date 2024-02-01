import "react-native-gesture-handler";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import ContactsProvider from "./src/providers/ContactsProvider";
import { AuthProvider } from "./src/providers/AuthContext";
import AppRouter from "./AppRouter";
import { ChatsProvider } from "./src/providers/ChatsProvider";
import { UsersProvider } from "./src/providers/UsersProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UsersProvider>
      <AuthProvider>
        <ChatsProvider>
          <ContactsProvider>
            <NavigationContainer>
              <AppRouter />
            </NavigationContainer>
          </ContactsProvider>
        </ChatsProvider>
      </AuthProvider>
    </UsersProvider>
  );
}
