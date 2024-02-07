import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const RideTypeSelector = ({ rideType, setRideType }) => {
  return (
    <View style={styles.subNavbar}>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "arrival" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("arrival")}
      >
        <Text style={styles.subNavbarText}>נחיתה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "departure" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("departure")}
      >
        <Text style={styles.subNavbarText}>המראה</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.subNavbarItem,
          rideType === "both" && styles.subNavbarItemActive,
        ]}
        onPress={() => setRideType("both")}
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
