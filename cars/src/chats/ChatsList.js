import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatRow from "./ChatRow"; // Assuming ChatRow is in the same directory
import { useChatsContext } from "../providers/ChatsProvider";
import { useNavigation } from "@react-navigation/native";
import { useUsersContext } from "../providers/UsersProvider";
import {
  getChatName,
  getLastMessageTextAndNameAndTime,
  getChatImage,
} from "../utils/chatsDataHelpers";
import { useAuth } from "../providers/AuthContext";

export default function ChatsList() {
  const { myChats } = useChatsContext();
  const navigation = useNavigation();
  const { allUsers } = useUsersContext();
  const { user } = useAuth();
  const handleChatSelect = (chatId) => {
    navigation.navigate("ChatWindow", { id: chatId });
  };

  console.log(myChats.length);

  const renderItem = ({ item, myId }) => {
    // Assuming each chat item has properties like id, name, city, image, etc.
    if (item?.messages?.length == 0 && item.type == "private") return null;
    const { textAndName, timeOfLastMessage } = getLastMessageTextAndNameAndTime(
      allUsers,
      item,
      user.id
    );
    console.log(item.timestamp);
    return (
      <ChatRow
        name={item.name ?? getChatName(allUsers, item, user.id)} // Replace with actual property names
        city={textAndName} // Default to "Tel Aviv" if city is not provided
        image={item.image ?? getChatImage(allUsers, item, user.id)} // Provide a default image if not provided
        onClick={() => handleChatSelect(item.id)}
        id={item.id}
        lastTimeMessage={timeOfLastMessage}
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
