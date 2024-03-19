import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../providers/AuthContext";
const defaultImage = require("../../assets/avatars/driver.png"); // Replace with the actual path

const ChatRow = ({
  name,
  city,
  image,
  onClick,
  id,
  lastTimeMessage = "",
  style = {},
  badge = 0,
}) => {
  const imageSource = image ? { uri: image } : defaultImage;
  const { user } = useAuth();
  if (user && user.uid == id) return;

  return (
    <TouchableOpacity style={[styles.row, style]} onPress={onClick}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {city && <Text style={styles.city}>{city}</Text>}
      </View>
      <Text style={styles.time}>{lastTimeMessage}</Text>
      {badge > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
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
    alignItems: "flex-start",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  badge: {
    backgroundColor: "#004aad",
    minWidth: 24, // Ensure the badge is at least somewhat round
    padding: 4, // Padding inside the badge
    borderRadius: 12, // Half of the height to make it perfectly round
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChatRow;
