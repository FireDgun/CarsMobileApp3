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
  container: {},
});

export default ChooseOriginAndDestination;
