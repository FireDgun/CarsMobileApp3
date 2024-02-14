// RidePreviewPage.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RidePreview from "./RidePreview";
import { useRidesContext } from "../../../providers/RidesContext";
import { getRideTypeHebrewName } from "../../../utils/ridesHelper";
import { useNavigation } from "@react-navigation/native";

const RidePreviewPage = ({ route }) => {
  // Extract ride data from route params
  const { ride: serializedRide } = route.params;
  const ride = JSON.parse(serializedRide);
  const navigation = useNavigation();

  const { postNewRide } = useRidesContext();
  const navigateToMySellRides = async () => {
    await postNewRide({ ...ride, type: getRideTypeHebrewName(ride.type) });
    navigation.navigate("Dashboard", { initialPage: "rides" });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>תצוגה מקדימה</Text>
      <RidePreview ride={ride} />
      <TouchableOpacity
        style={styles.navigateButton}
        onPress={navigateToMySellRides}
      >
        <Text style={styles.navigateButtonText}>שמור</Text>
      </TouchableOpacity>
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
    marginTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  navigateButton: {
    backgroundColor: "#4CAF50", // A different color to distinguish this button
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20, // Adjust as needed for spacing from the bottom
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RidePreviewPage;
