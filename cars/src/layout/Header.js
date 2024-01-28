import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TopNavigation from "./TopNavigation";
import { useNavigation } from "@react-navigation/native";

const Header = ({ setSelectedTab }) => {
  const navigation = useNavigation();

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
      <View style={styles.icons}>
        <TouchableOpacity onPress={handleSearch}>
          <Text>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSettings}>
          <Text>⚙️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text>🚪</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TopNavigation setSelectedTab={setSelectedTab} />
      </View>
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
  icons: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  menu: { width: "100%" },
});

export default Header;
