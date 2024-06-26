import React, { useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
import { MaterialIcons } from "@expo/vector-icons";

export default function ChatsList() {
  const { myChats } = useChatsContext();
  const navigation = useNavigation();
  const { allUsers } = useUsersContext();
  const { user } = useAuth();

  if (user) {
    const handleChatSelect = useCallback(
      (chatId) => {
        navigation.navigate("ChatWindow", { id: chatId });
      },
      [navigation]
    );
    const navigateToPostNewRide = () => {
      navigation.navigate("PostNewRide");
    };
    const renderItem = ({ item }) => {
      // Assuming each chat item has properties like id, name, city, image, etc.
      if (item?.messages?.length == 0 && item.type == "private") return null;
      const { textAndName, timeOfLastMessage } =
        getLastMessageTextAndNameAndTime(allUsers, item, user.uid);
      return (
        <ChatRow
          name={item.name ?? getChatName(allUsers, item, user.uid)} // Replace with actual property names
          city={textAndName} // Default to "Tel Aviv" if city is not provided
          image={item.image ?? getChatImage(allUsers, item, user.uid)} // Provide a default image if not provided
          onClick={() => handleChatSelect(item.id)}
          id={item.id}
          lastTimeMessage={timeOfLastMessage}
          badge={
            item.messages.filter((m) => !m.readBy.includes(user.uid)).length
          }
        />
      );
    };

    return (
      <View style={styles.container}>
        <FlatList
          data={myChats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <TouchableOpacity
          style={styles.newChatButton}
          onPress={navigateToPostNewRide}
        >
          <MaterialIcons name="directions-bus" size={24} color={"white"} />
          <Text style={styles.newChatButtonText}>+</Text>
        </TouchableOpacity> */}
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
  },
  newChatButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#841584",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  newChatButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
