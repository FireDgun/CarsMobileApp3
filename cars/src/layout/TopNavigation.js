import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TopNavigation = ({ setSelectedTab }) => {
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={() => setSelectedTab("chats")}>
        <Text>Chats</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedTab("rides")}>
        <Text>Rides</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#EEE",
    padding: 10,
  },
});

export default TopNavigation;
