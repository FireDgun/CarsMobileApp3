import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import CustomImagePicker from "../components/CustomImagePicker";
import Header from "../layout/Header";
import uuid from "react-native-uuid";
import useChats from "../hooks/useChats";
import { useChatsContext } from "../providers/ChatsProvider";
import { useAuth } from "../providers/AuthContext";
import { useNavigation } from "@react-navigation/native";

const StartNewChatGroupDetails = ({ route }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [imageGroupChatId, setImageGroupChatId] = useState(uuid.v4());
  const { createGroupChat } = useChatsContext();
  const { user } = useAuth();
  const navigation = useNavigation();
  const { selectedUsers } = route.params;

  const handleGroupNameChange = (text) => {
    setGroupName(text);
  };

  const handleCreateGroup = async () => {
    try {
      let newChatId = await createGroupChat(
        [...selectedUsers.map((u) => u.id), user.uid],
        groupImage ?? "",
        groupName ?? ""
      );
      console.log("New chat created with id ", newChatId);
      navigation.navigate("Dashboard");
    } catch (err) {
      console.log("Error while creating new group chat ", err);
    }
  };

  const renderSelectedUser = ({ item }) => (
    <View style={styles.selectedUser}>
      <Image source={{ uri: item.profilePic }} style={styles.userImage} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <CustomImagePicker
          folderName="group_images"
          uid={imageGroupChatId} // This should be a unique ID for the group
          handleSetState={setGroupImage}
        />
        <TextInput
          value={groupName}
          onChangeText={handleGroupNameChange}
          placeholder="Enter group name"
          style={styles.textInput}
        />
        <FlatList
          data={selectedUsers}
          renderItem={renderSelectedUser}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedUsersList}
        />
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={handleCreateGroup}
        >
          <Text style={styles.createGroupButtonText}>Create Group</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  selectedUser: {
    alignItems: "center",
    marginRight: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    marginTop: 5,
  },
  selectedUsersList: {
    marginBottom: 20,
  },
  createGroupButton: {
    backgroundColor: "#007bff",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  createGroupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default StartNewChatGroupDetails;
