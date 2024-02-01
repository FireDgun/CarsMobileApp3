import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TopNavigation from "./TopNavigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import auth from "@react-native-firebase/auth";

const Header = ({ setSelectedTab }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleSearch = () => {
    console.log("Search clicked");
  };

  const handleSettings = () => {
    console.log("Settings clicked");
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Error during logout :" + error);
    }
  };
  return (
    <View style={styles.header}>
      <View style={styles.iconsBar}>
        {
          route.name !== "Dashboard" ? (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          ) // Placeholder when back button is not shown
        }
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons name="search" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSettings}>
            <MaterialIcons name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text>🚪</Text>
        </TouchableOpacity>
      </View>
      {route.name === "Dashboard" && (
        <View style={styles.menu}>
          <TopNavigation setSelectedTab={setSelectedTab} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    paddingTop: 50,
    backgroundColor: "#DDD",
    width: "100%",
  },
  iconsBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10, // Add some padding on the sides
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    // Remove alignSelf: "end"
  },
  placeholder: {
    width: 50, // Make sure this width is similar to the back button's width
  },
  menu: {
    width: "100%",
  },
});

export default Header;
