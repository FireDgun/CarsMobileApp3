import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useUsersContext } from "../../../providers/UsersProvider";
import { useChatsContext } from "../../../providers/ChatsProvider";
import { useAuth } from "../../../providers/AuthContext";
import { useNavigation } from "@react-navigation/native";
import ChatRow from "../../../chats/ChatRow";
import { getChatImage, getChatName } from "../../../utils/chatsDataHelpers";
import { MaterialIcons } from "@expo/vector-icons";

const UsersChatsSelection = ({ selectedItems, setSelectedItems }) => {
  const { allUsers } = useUsersContext();
  const { myChats } = useChatsContext();
  const { user } = useAuth();
  const navigation = useNavigation();
  const handleSelectItem = (item) => {
    const index = selectedItems.findIndex(
      (selectedItem) =>
        selectedItem.id === item.id || selectedItem.id === item.uid
    );
    if (index > -1) {
      // If already selected, remove it from the selection
      setSelectedItems(selectedItems.filter((_, i) => i !== index));
    } else {
      // Otherwise, add to the selection
      setSelectedItems([
        ...selectedItems,
        { ...item, id: item.id ?? item.uid },
      ]);
    }
  };

  const isSelected = (itemId) => {
    return selectedItems.some((item) => item.id === itemId);
  };

  const renderItem = ({ item }) => {
    const selected = isSelected(item.id ?? item.uid);

    // Directly pass the selected style to ChatRow
    return (
      <ChatRow
        name={
          item.type === "chat"
            ? getChatName(allUsers, item, user.uid)
            : item.name
        }
        city={""}
        image={
          item.type === "chat"
            ? getChatImage(allUsers, item, user.uid)
            : item.profilePic
        }
        lastTimeMessage={""}
        onClick={() => handleSelectItem(item)}
        style={selected ? styles.selectedRow : null} // Apply selected style if item is selected
        // The checkmark icon can be included within ChatRow or managed separately if needed
      />
    );
  };
  const renderSelectedItem = (item) => {
    console.log(item);
    return (
      <View key={item.id} style={styles.selectedUserContainer}>
        <TouchableOpacity
          style={styles.removeUserButton}
          onPress={() => handleSelectItem(item)}
        >
          <Image
            source={{
              uri:
                item.type === "chat"
                  ? getChatImage(allUsers, item, user.uid)
                  : item.profilePic,
            }}
            style={styles.selectedUserImage}
          />
        </TouchableOpacity>
        <Text style={styles.selectedUserName}>
          {item.name ?? getChatName(allUsers, item, user.uid)}
        </Text>
      </View>
    );
  };

  const combinedData = [
    ...myChats.map((chat) => ({ ...chat, type: "chat" })),
    ...allUsers
      .filter(
        (u) =>
          !myChats.some(
            (chat) =>
              chat.chatParticipants.includes(u.uid) && chat.type === "private"
          )
      )
      .map((user) => ({ ...user, type: "user" })),
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.selectedItemsContainer}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {selectedItems.map(renderSelectedItem)}
      </ScrollView>
      <FlatList
        data={combinedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ?? item.uid}
      />
      {/* Implement any action buttons here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    // Styles for your row
  },
  selectedRow: {
    // Styles for your selected row, for example, a different background color
    backgroundColor: "#D3D3D3",
  },
  checkmarkIcon: {
    // Style for your checkmark icon
    width: 20,
    height: 20,
    marginRight: 10,
  },
  selectedUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedItemsContainer: {
    flexDirection: "row",
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 120,
  },
  selectedUserContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#9ac6f5",
    borderRadius: 15, // Reduced for a more compact look
    padding: 5,
    marginRight: 10,
    height: 60, // Specify a fixed height to control the overall size
  },
  removeUserButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  selectedUserName: {
    fontSize: 12, // Reduced font size for a more compact look
    color: "#fff", // Ensuring text is visible on the blue background
    marginLeft: 5, // Added some space between the image and the text
  },
});

export default UsersChatsSelection;
