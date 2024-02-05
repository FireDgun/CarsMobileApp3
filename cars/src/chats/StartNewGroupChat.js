import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Header from "../layout/Header";
import ChatRow from "./ChatRow"; // Ensure this path is correct
import { useUsersContext } from "../providers/UsersProvider";
import { useNavigation } from "@react-navigation/native";

const StartNewGroupChat = () => {
  const { allUsers } = useUsersContext();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigation = useNavigation();
  const handleNavigate = () => {
    // Navigate and pass the selected users to the next screen
    navigation.navigate("StartNewChatGroupDetails", { selectedUsers });
  };

  const handleSelectUser = (user) => {
    setSelectedUsers((prevSelected) => [...prevSelected, user]);
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.filter((user) => user.uid !== userId)
    );
  };

  const isSelected = (userId) => {
    return selectedUsers.some((user) => user.uid === userId);
  };

  const renderItem = ({ item }) => (
    <ChatRow
      name={item.name}
      city={item.city}
      image={item.profilePic}
      onClick={() => handleSelectUser(item)}
      id={item.id}
      // Add additional props as needed
    />
  );

  const renderSelectedUser = (user) => (
    <View key={user.uid} style={styles.selectedUserContainer}>
      <Image
        source={{ uri: user.profilePic }}
        style={styles.selectedUserImage}
      />
      <TouchableOpacity
        style={styles.removeUserButton}
        onPress={() => handleRemoveUser(user.uid)}
      >
        <Text style={styles.removeUserButtonText}>x</Text>
      </TouchableOpacity>
      <Text style={styles.selectedUserName}>{user.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="New Group Chat" />
      <ScrollView horizontal style={styles.selectedUsersContainer}>
        {selectedUsers.map(renderSelectedUser)}
      </ScrollView>
      <FlatList
        data={allUsers.filter((user) => !isSelected(user.uid))}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid.toString()}
        style={styles.list}
      />
      <TouchableOpacity style={styles.continueButton} onPress={handleNavigate}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  selectedUsersContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    maxHeight: 100,
  },
  continueButton: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedUserContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    position: "relative",
    paddingVertical: 4, // Reduced padding
  },
  selectedUserImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  removeUserButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  removeUserButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  selectedUserName: {
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  // ... Add other styles that you might need
});

export default StartNewGroupChat;
