import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput"; // Adjust the path as necessary

const OneFlightLocationSelector = ({ rideType, handleInputChange }) => {
  return (
    <View style={styles.container}>
      {rideType === "arrival" && (
        <>
          <Text style={styles.text}>מנתב"ג</Text>
        </>
      )}
      <GooglePlacesInput
        onLocationSelect={(location) =>
          handleInputChange(
            rideType === "departure" ? "destination" : "origin",
            location
          )
        }
        placeholder={rideType === "arrival" ? "כתובת חזור" : "כתובת איסוף"}
      />
      {rideType !== "arrival" && <Text style={styles.text}>לנתב"ג</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center", // Center items vertically
    marginBottom: 10, // Adjust as necessary
  },
  text: {
    fontSize: 16, // Match the font size with the input field
    color: "#333", // Match the text color with the input field
    // marginRight: 50, (You might want to adjust or remove this)
    // Add padding to match the input field height if necessary
    paddingTop: 12, // Adjust as necessary
    paddingBottom: 12, // Adjust as necessary
    marginLeft: 10,
    marginRight: 10,
  },
});

export default OneFlightLocationSelector;
