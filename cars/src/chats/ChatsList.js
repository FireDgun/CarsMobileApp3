import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import ChatRow from "./ChatRow"; // Assuming ChatRow is in the same directory
import { useChatsContext } from "../providers/ChatsProvider";
import { useNavigation } from "@react-navigation/native";

export default function ChatsList() {
  const { myChats } = useChatsContext();
  const navigation = useNavigation();

  const handleChatSelect = (chatId) => {
    navigation.navigate("ChatWindow", { id: chatId });
  };

  const renderItem = ({ item }) => {
    // Assuming each chat item has properties like id, name, city, image, etc.
    if (item?.messages?.length == 0) return null;
    return (
      <ChatRow
        name={item.name} // Replace with actual property names
        city={item.city} // Replace with actual property names
        image={item.image} // Replace with actual property names
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
