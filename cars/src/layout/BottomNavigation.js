import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const BottomNavigation = ({
  selectedTab,
  setSelectedTab,
  mainButtonFunction,
}) => {
  const navigation = useNavigation();

  const navigateToPostNewRide = () => {
    navigation.navigate("PostNewRide");
  };
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setSelectedTab("chats")}
      >
        <Image
          source={
            selectedTab === "chats"
              ? require("../../assets/icons/chatIconChecked.png")
              : require("../../assets/icons/chatIcon.png")
          }
          style={styles.iconChat}
        />
        <Text
          style={[styles.text, selectedTab === "chats" && styles.selectedText]}
        >
          צ'אט
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButtonContainer}
        onPress={() => {
          if (mainButtonFunction) {
            mainButtonFunction();
          } else {
            navigateToPostNewRide();
          }
        }}
      >
        <View style={styles.addButton}>
          <Image
            source={
              mainButtonFunction
                ? require("../../assets/buttons/publishNewRide.png")
                : require("../../assets/buttons/postNewRideButton.png")
            }
            style={mainButtonFunction ? styles.publishIcon : styles.addIcon}
          />
        </View>
        <Text style={styles.addText}>
          {mainButtonFunction ? "פרסום נסיעה" : "הוסף נסיעה"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setSelectedTab("rides")}
      >
        <Image
          source={
            selectedTab === "rides"
              ? require("../../assets/icons/ridesIconChecked.png")
              : require("../../assets/icons/ridesIcon.png")
          }
          style={styles.iconRides}
        />
        <Text
          style={[styles.text, selectedTab === "rides" && styles.selectedText]}
        >
          נסיעות
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 5,
    position: "absolute",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
  },
  navItem: {
    alignItems: "center",
  },
  iconChat: {
    width: 28,
    height: 24,
    marginBottom: 5,
  },
  iconRides: {
    width: 21,
    height: 27,
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#000",
  },
  selectedText: {
    color: "#3f51b5",
  },
  addButtonContainer: {
    alignItems: "center",
    marginTop: -30, // Move the button up
  },
  addButton: {
    width: 90, // Increase size of button
    height: 90, // Increase size of button
    borderRadius: 40, // Adjust border radius to match the new size
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -30,
    borderWidth: 5,
    borderColor: "#FFFFFF",
    backgroundColor: "#3f51b5", // Add background color to match the design
  },
  addIcon: {
    width: 30, // Increase size of icon
    height: 55, // Increase size of icon
  },
  publishIcon: {
    width: 55, // Increase size of icon
    height: 30, // Increase size of icon
  },
  addText: {
    fontSize: 12,
    color: "#3f51b5",
    marginTop: 35,
  },
});

export default BottomNavigation;
