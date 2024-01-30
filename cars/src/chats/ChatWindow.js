import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../providers/AuthContext";
import { useChatsContext } from "../providers/ChatsProvider";

function ChatWindow({ route }) {
  const { id: chatId } = route.params; // The ID of the other user in the chat
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const { sendMessage, myChats } = useChatsContext();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Load the chat messages between the current user and the other user
    const chat = myChats.find((chat) => chat.id == chatId);
    if (chat && chat.messages) {
      setMessages(chat.messages);
    }
  }, [myChats, chatId]);

  const clickOnSendMessage = () => {
    if (newMessage.trim()) {
      // Call handleSendMessage with the necessary parameters
      sendMessage(chatId, { text: newMessage });
      setNewMessage("");
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={
        item.senderId === user.uid ? styles.myMessage : styles.otherMessage
      }
    >
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <MaterialIcons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Search")}>
          <MaterialIcons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("More options")}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.timestamp.toString() + item.senderId}
        style={styles.messagesList}
        // Inverts the order so new messages are at the bottom
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={clickOnSendMessage}>
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#DDD",
    paddingTop: 50,
  },
  messagesList: {
    flex: 1,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DFF7DF",
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EFEFEF",
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ChatWindow;
