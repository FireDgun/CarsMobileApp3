import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfilePage = ({ route }) => {
  const { chatId, chatName, chatImage } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current; // You'll animate this value on scroll
  const navigation = useNavigation();

  const headerHeight = 100; // Adjust as needed

  const headerStyle = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: ["transparent", "#075E54"], // Example color from WhatsApp
    extrapolate: "clamp",
  });

  const profileImageOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const profileNameOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Mock data for history
  const mockHistory = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
    { key: "6" }, // Add more if needed
  ];

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.header,
          { height: headerHeight, backgroundColor: headerStyle },
        ]}
      >
        <View style={styles.headerChatDetails}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <Animated.Image
            source={{ uri: chatImage }}
            style={[styles.headerImage, { opacity: profileImageOpacity }]}
          />
          <Animated.Text
            style={[styles.headerText, { opacity: profileNameOpacity }]}
          >
            {chatName}
          </Animated.Text>
        </View>
        <TouchableOpacity onPress={() => console.log("More options")}>
          <MaterialIcons name="more-vert" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Set to true if you want to use native driver for performance
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.imageContainer}>
          {chatImage && (
            <Image source={{ uri: chatImage }} style={styles.profileImage} />
          )}
          <Text style={styles.profileName}>{chatName}</Text>
        </View>
        <View style={styles.historyContainer}>
          {mockHistory.map((item) => (
            <View key={item.key} style={styles.mockDiv}></View>
          ))}
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => console.log("Block")}
            style={styles.actionButton}
          >
            <MaterialIcons name="block" size={24} color="red" />
            <Text>חסום</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Report")}
            style={styles.actionButton}
          >
            <MaterialIcons name="report" size={24} color="red" />
            <Text>דווח</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50, // You might need to adjust this based on the device's status bar
    paddingHorizontal: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerChatDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerImage: {
    width: 30, // Adjust as needed
    height: 30, // Adjust as needed
    borderRadius: 15,
    marginLeft: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,

    // Adjust font size and margins as needed
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 60, // Height of the header
  },
  historyContainer: {
    padding: 10,
    // Add additional styling
  },
  mockDiv: {
    height: 100,
    backgroundColor: "#DDD",
    marginBottom: 10,
    // Add additional styling
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionButton: {
    alignItems: "center",
    // Add additional styling
  },
});

export default ProfilePage;
