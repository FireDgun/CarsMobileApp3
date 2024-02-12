// RidePreviewPage.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RidePreview from "./RidePreview";

const RidePreviewPage = ({ route }) => {
  // Extract ride data from route params
  const { ride: serializedRide } = route.params;
  console.log(serializedRide);
  const ride = JSON.parse(serializedRide);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>תצוגה מקדימה</Text>
      <RidePreview ride={ride} />
    </View>
  );
};

// Add some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default RidePreviewPage;
