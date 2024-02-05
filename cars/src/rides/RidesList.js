import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RidesList = () => {
  const navigation = useNavigation();

  const navigateToPostNewRide = () => {
    navigation.navigate("PostNewRide");
  };
  return (
    <View style={styles.container}>
      <Text>RidesList</Text>
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={navigateToPostNewRide}
      >
        <Text style={styles.newChatButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default RidesList;
