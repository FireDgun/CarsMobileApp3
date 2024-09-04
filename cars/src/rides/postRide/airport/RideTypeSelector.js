import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const RideTypeSelector = ({ rideType, setRideType }) => {
  return (
    <View style={styles.subNavbar}>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "airportArrival" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("airportArrival")}
      >
        <Text style={styles.subNavbarText}>נחיתה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "airportDeparture" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("airportDeparture")}
      >
        <Text style={styles.subNavbarText}>המראה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "airportBoth" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("airportBoth")}
      >
        <Text style={styles.subNavbarText}>גם וגם</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subNavbar: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  subNavbarItem: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginHorizontal: 10,
  },
  subNavbarItemActive: {
    borderBottomColor: "#007bff",
  },
  subNavbarText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});

export default RideTypeSelector;
