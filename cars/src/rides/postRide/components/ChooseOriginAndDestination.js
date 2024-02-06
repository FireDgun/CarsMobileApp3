// ChooseOriginAndDestination component
import React from "react";
import { View, StyleSheet } from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput"; // Adjust path as necessary

const ChooseOriginAndDestination = ({
  origin,
  destination,
  handleInputChange,
}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesInput
        onLocationSelect={(location) => handleInputChange("origin", location)}
        placeholder="מוצא"
      />
      <View style={styles.spacer}></View>
      {/* Add a spacer View between inputs */}
      <GooglePlacesInput
        onLocationSelect={(location) =>
          handleInputChange("destination", location)
        }
        placeholder="יעד"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30, // Ensure there's space between this and the next form element
  },
  spacer: {
    height: 50, // Adjust height as necessary to create space between the inputs
  },
});

export default ChooseOriginAndDestination;
