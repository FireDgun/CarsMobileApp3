import React, { useMemo } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import Header from "../layout/Header";
import ChatRow from "./ChatRow";
import { useContacts } from "../providers/ContactsProvider";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../providers/AuthContext";
import { useChatsContext } from "../providers/ChatsProvider";
import { useUsersContext } from "../providers/UsersProvider";

export default function StartNewChat() {
  const contacts = useContacts();
  const { allUsers, usersNumbers } = useUsersContext();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { createChat } = useChatsContext();

  const handleRowClickUser = async (id) => {
    const chatId = await createChat(user.uid, id);
    navigation.navigate("ChatWindow", { id: chatId });
    console.log(`Clicked on ${chatId}`);
  };
  const handleRowClickContact = (id) => {
    console.log(`Clicked on ${id}`);
  };
  // Combine all users and contacts into one array for rendering in FlatList
  const combinedData = useMemo(() => {
    return [
      { type: "header", title: "חברים באפליקציה" },
      ...allUsers.map((user) => ({ type: "user", ...user })),
      { type: "header", title: "הזמן אנשי קשר" },
      ...contacts
        .filter((contact) => !usersNumbers.includes(contact.number))
        .map((contact) => ({ type: "contact", ...contact })),
    ];
  }, [allUsers, contacts]);
  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return <Text style={styles.subtitle}>{item.title}</Text>;
    }
    return (
      <ChatRow
        name={item?.name}
        id={item?.id || "no id"}
        city={item?.selectedLocations?.join("-") || ""} // Default to "Tel Aviv" if city is not provided
        image={item?.profilePic} // Provide a default image if not provided
        onClick={
          usersNumbers.includes(item.phoneNumber)
            ? () => handleRowClickUser(item.id)
            : () => handleRowClickContact(item.name)
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `item-${index}`}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Start a New Chat</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  subtitle: {
    fontSize: 18,
    padding: 10,
    paddingTop: 20,
    backgroundColor: "#f8f8f8",
  },
});
