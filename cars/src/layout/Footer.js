import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import BottomNavigation from "./BottomNavigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import PopupMenu from "./PopupMenu";

const Footer = ({ setSelectedTab, selectedTab }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setMenuVisible(false);
      setSearchVisible(false);
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
      {/* <View style={styles.iconsBar}>
        {isSearchVisible ? (
          <>
            <TouchableOpacity style={styles.backBtn} onPress={toggleSearch}>
              <MaterialIcons name="arrow-forward-ios" size={30} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              autoFocus={true}
            />
          </>
        ) : (
          <TouchableOpacity onPress={toggleSearch}>
            <MaterialIcons name="search" size={30} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={toggleMenu}>
          <MaterialIcons name="more-vert" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
      {route.name === "Dashboard" && (
        <View style={styles.menu}>
          <BottomNavigation
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
          {/* <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>התנתק</Text>
          </TouchableOpacity> */}
        </View>
      )}
      {/* <PopupMenu visible={isMenuVisible} onClose={toggleMenu}>
        {route.name === "Dashboard" && (
          <TouchableOpacity
            onPress={() => {
              setMenuVisible(false);
              setSearchVisible(false);
              navigation.navigate("StartNewChat");
            }}
          >
            <Text style={styles.menuItem}>שיחה חדשה</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => {
            console.log("setting");
          }}
        >
          <Text style={styles.menuItem}>הגדרות</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.menuItem}>התנתק</Text>
        </TouchableOpacity>
      </PopupMenu> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    backgroundColor: "#DDD",
    width: "100%",
  },
  backBtn: {
    marginRight: "auto",
  },
  iconsBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 10, // Add some padding on the sides
  },

  placeholder: {
    width: 50, // Make sure this width is similar to the back button's width
  },
  menu: {
    width: "100%",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10, // add some margin to the right of the search bar
  },
  menuBox: {
    position: "absolute",
    right: 10,
    top: 50,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10, // for Android shadow
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Footer;
