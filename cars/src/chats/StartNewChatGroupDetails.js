import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import CustomImagePicker from "../components/CustomImagePicker";
import Header from "../layout/Header";
import uuid from "react-native-uuid";
import { useChatsContext } from "../providers/ChatsProvider";
import { useAuth } from "../providers/AuthContext";
import { useNavigation } from "@react-navigation/native";

const StartNewChatGroupDetails = ({ route }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for managing error messages
  const [isLoading, setIsLoading] = useState(false); // New state for managing loading state
  const [imageGroupChatId, setImageGroupChatId] = useState(uuid.v4());
  const { createGroupChat } = useChatsContext();
  const { user } = useAuth();
  const navigation = useNavigation();
  const { selectedUsers } = route.params;

  const handleGroupNameChange = (text) => {
    setGroupName(text);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleCreateGroup = async () => {
    const trimmedGroupName = groupName.trim();
    if (trimmedGroupName.length === 0) {
      setErrorMessage("חובה לכתוב שם קבוצה");
      return;
    }
    setIsLoading(true); // Start loading
    try {
      let newChatId = await createGroupChat(
        [...selectedUsers.map((u) => u.uid), user.uid],
        groupImage ??
          "https://firebasestorage.googleapis.com/v0/b/carsmobileapp-5f072.appspot.com/o/team.png?alt=media&token=378045e0-c9f8-4464-b0c0-64afa19f0225",
        trimmedGroupName
      );
      navigation.navigate("Dashboard");
    } catch (err) {
      console.log("Error while creating new group chat ", err);
      setErrorMessage(
        "An error occurred while creating the group. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  };

  return (
    <>
      <View style={styles.container}>
        <CustomImagePicker
          folderName="group_images"
          uid={imageGroupChatId}
          handleSetState={setGroupImage}
        />
        <TextInput
          value={groupName}
          onChangeText={handleGroupNameChange}
          placeholder="שם הקבוצה"
          style={styles.textInput}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <FlatList
          data={selectedUsers}
          renderItem={({ item }) => (
            <View style={styles.selectedUser}>
              <Image
                source={{ uri: item.profilePic }}
                style={styles.userImage}
              />
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.uid}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedUsersList}
        />
        <TouchableOpacity
          style={styles.createGroupButton}
          onPress={handleCreateGroup}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.createGroupButtonText}>צור קבוצה חדשה</Text>
          )}
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
  errorText: {
    color: "red", // Make the error message stand out
    marginBottom: 10,
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
