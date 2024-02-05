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
import { getChatImage, groupMessagesByDate } from "../utils/chatsDataHelpers";
import Message from "./Message";
import { useUsersContext } from "../providers/UsersProvider";
const keyExtractor = (item, index) => {
  if (item.type === "message") {
    // Use a combination of timestamp and senderId for messages
    return item.timestamp.toString() + item.senderId;
  } else {
    // Use the date and index for date separators
    return `separator-${item.date}-${index}`;
  }
};
function ChatWindow({ route }) {
  const { id: chatId } = route.params; // The ID of the other user in the chat
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const { sendMessage, myChats } = useChatsContext();
  const { allUsers } = useUsersContext();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [chatImage, setChatImage] = useState();

  useEffect(() => {
    if (chat.chatParticipants) {
      setChatImage(chat.image ?? getChatImage(allUsers, chat, user.uid));
    }
  }, [chat]);

  useEffect(() => {
    const chat = myChats.find((chat) => chat.id == chatId);
    if (chat && chat.messages) {
      const groupedMessages = groupMessagesByDate(chat.messages);
      setMessages(groupedMessages);
      setChat(chat);
    }
  }, [myChats, chatId]);

  const clickOnSendMessage = () => {
    if (newMessage.trim()) {
      // Call handleSendMessage with the necessary parameters
      sendMessage(chatId, { text: newMessage });
      setNewMessage("");
    }
  };

  const renderMessage = ({ item }) => {
    if (item.type === "date") {
      return (
        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      );
    } else {
      // item.type === 'message'
      return <Message messageInfo={item} user={user} chatType={chat.type} />;
    }
  };

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
        keyExtractor={keyExtractor}
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
  dateSeparator: {
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    padding: 5,
    backgroundColor: "#EEE",
    borderRadius: 10,
  },
});

export default ChatWindow;
