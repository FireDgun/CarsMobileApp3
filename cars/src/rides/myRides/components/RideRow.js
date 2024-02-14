import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { formatAddress, formatDate } from "../../../utils/ridesHelper";

const RideRow = ({ ride }) => {
  return (
    <View style={styles.rideRow}>
      <View style={styles.rideInfo}>
        <Text style={styles.rideText}> {formatDate(ride.date)}</Text>
        <Text style={styles.rideText}>מוצא: {formatAddress(ride.origin)}</Text>
        <Text style={styles.rideText}>
          יעד: {formatAddress(ride.destination)}
        </Text>
        <Text style={styles.rideText}>מחיר: {ride.price}₪</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="gray" />
    </View>
  );
};
const styles = StyleSheet.create({
  rideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    backgroundColor: "#FFF",
  },
  rideInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  rideText: {
    fontSize: 16,
    color: "#444",
  },
});

export default RideRow;
