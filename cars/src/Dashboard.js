import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "./layout/Header";
import RidesList from "./rides/RidesList";
import ChatsList from "./chats/ChatsList";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("chats");

  return (
    <View style={styles.container}>
      <Header setSelectedTab={setSelectedTab} />
      <View style={styles.contentContainer}>
        {selectedTab === "chats" ? <ChatsList /> : <RidesList />}
      </View>
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
});
