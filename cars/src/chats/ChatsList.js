import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatRow from "./ChatRow"; // Assuming ChatRow is in the same directory
import { useChatsContext } from "../providers/ChatsProvider";
import { useNavigation } from "@react-navigation/native";
import { useUsersContext } from "../providers/UsersProvider";
import {
  getChatName,
  getLastMessageTextAndName,
} from "../utils/chatsDataHelpers";

export default function ChatsList() {
  const { myChats } = useChatsContext();
  const navigation = useNavigation();
  const { allUsers } = useUsersContext();
  const handleChatSelect = (chatId) => {
    navigation.navigate("ChatWindow", { id: chatId });
  };

  const renderItem = ({ item }) => {
    // Assuming each chat item has properties like id, name, city, image, etc.
    if (item?.messages?.length == 0) return null;
    return (
      <ChatRow
        name={getChatName(allUsers, item)} // Replace with actual property names
        city={getLastMessageTextAndName(allUsers, item)} // Default to "Tel Aviv" if city is not provided
        image={item?.profilePic} // Provide a default image if not provided
        onClick={() => handleChatSelect(item.id)}
        id={item.id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={myChats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <Text style={styles.header}>My Chats</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
});
