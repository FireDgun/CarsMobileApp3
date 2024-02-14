import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MySellRides from "./myRides/sellRide/MySellRides";
import MyBuyRides from "./myRides/buyRide/MyBuyRides";

const RidesList = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState("MySellRides");

  const navigateToPostNewRide = () => {
    navigation.navigate("PostNewRide");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedTab === "MySellRides" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("MySellRides")}
          >
            <Text style={styles.navButtonText}>פרסמתי</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.navButton,
              selectedTab === "MyBuyRides" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("MyBuyRides")}
          >
            <Text style={styles.navButtonText}>לקחתי</Text>
          </TouchableOpacity>
        </View>
        {selectedTab === "MySellRides" ? <MySellRides /> : <MyBuyRides />}
      </ScrollView>
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
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  navButton: {
    padding: 10,
    margin: 5,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#841584",
  },
  navButtonText: {
    color: "#841584",
    fontWeight: "bold",
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
    elevation: 4,
    shadowColor: "#000",
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
