import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { buildRidePostText } from "../../../utils/ridesHelper";

const RideDetails = ({ ride, setShowStopsModal, setStopsToDisplay }) => {
  const rideDetails = buildRidePostText(
    ride,
    setShowStopsModal,
    setStopsToDisplay
  );
  return (
    <>
      {rideDetails.map((detail, index) => (
        <Text key={index} style={styles.detailText}>
          {detail.label}
          {detail.label != "" ? ":" : ""} {detail.value}
        </Text>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default RideDetails;
