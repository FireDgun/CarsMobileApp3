import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const PostNewRide = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-forward" size={24} />
      </TouchableOpacity>

      <Text style={styles.title}>בחר סוג נסיעה</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen("PostJumpRide")}
      >
        <MaterialIcons name="directions-bus" size={24} />
        <Text style={styles.buttonText}>הקפצה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen("PostTripRide")}
      >
        <MaterialIcons name="departure-board" size={24} />
        <Text style={styles.buttonText}>צמוד</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen("PostAirportRide")}
      >
        <MaterialIcons name="local-airport" size={24} />
        <Text style={styles.buttonText}>נתב"ג</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen("PostLineRide")}
      >
        <MaterialIcons name="rv-hookup" size={24} />
        <Text style={styles.buttonText}>קווים</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostNewRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100, // Make space for the back button
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    zIndex: 10,
  },
  buttonText: {
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    flexDirection: "row", // To align icon and text horizontally
    alignItems: "center", // To center them vertically
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    width: "80%",
    justifyContent: "center",
    alignSelf: "center", // Center button in the screen
  },
});
