import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Header from "./layout/Header";
import RidesList from "./rides/RidesList";
import ChatsList from "./chats/ChatsList";
import { useNavigation } from "@react-navigation/native";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("chats");
  const navigation = useNavigation();

  const navigateToStartNewChat = () => {
    navigation.navigate("StartNewChat");
  };

  return (
    <View style={styles.container}>
      <Header setSelectedTab={setSelectedTab} />
      <View style={styles.contentContainer}>
        {selectedTab === "chats" ? <ChatsList /> : <RidesList />}
      </View>
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={navigateToStartNewChat}
      >
        <Text style={styles.newChatButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBDB8",
  },
  contentContainer: {
    flex: 1,
  },
  newChatButton: {
    position: "absolute",
    left: 20,
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
    fontSize: 24,
    fontWeight: "bold",
  },
});
