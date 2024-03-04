import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { getRideTypeHebrewName } from "../../../utils/ridesHelper";
import RideDetails from "../components/RideDetails";
import StopsModal from "../components/StopsModal";
import { useNavigation } from "@react-navigation/native";
import { useRidesContext } from "../../../providers/RidesContext";

const RidePreview = ({ ride }) => {
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);

  return (
    <View style={styles.card}>
      <Text style={styles.rideType}>{getRideTypeHebrewName(ride.type)}</Text>

      <View style={styles.messageContainer}>
        <RideDetails
          ride={ride}
          setShowStopsModal={setShowStopsModal}
          setStopsToDisplay={setStopsToDisplay}
        />
        <StopsModal
          setShowStopsModal={setShowStopsModal}
          showStopsModal={showStopsModal}
          stopsToDisplay={stopsToDisplay}
        />
      </View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>שלח</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "space-between", // Pushes the card to the top and button to the bottom
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rideType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  button: {
    backgroundColor: "#34b7f1",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // Styles for the new navigate button
});

export default RidePreview;
