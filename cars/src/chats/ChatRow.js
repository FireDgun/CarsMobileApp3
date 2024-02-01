import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../providers/AuthContext";
const defaultImage = require("../../assets/avatars/driver.png"); // Replace with the actual path

const ChatRow = ({ name, city, image, onClick, id }) => {
  const imageSource = image ? { uri: image } : defaultImage;
  const { user } = useAuth();
  if (user && user.uid == id) return;

  return (
    <TouchableOpacity style={styles.row} onPress={onClick}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {city && <Text style={styles.city}>{city}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start", // Aligns items to the right
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    fontSize: 14,
    color: "#666",
  },
});

export default ChatRow;
