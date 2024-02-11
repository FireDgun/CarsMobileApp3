import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput"; // Adjust the path as necessary
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have expo-vector-icons installed

const OneFlightLocationSelector = ({
  rideType,
  handleInputChange,
  returnFlight = "",
}) => {
  const [stops, setStops] = useState([]);

  const addStop = () => {
    setStops([...stops, ""]); // Add a new empty stop
  };

  const removeStop = (index) => {
    const updatedStops = stops.filter((_, idx) => idx !== index);
    setStops(updatedStops);
    handleInputChange("stops" + returnFlight, updatedStops); // Update the parent component's state with the new stops array
  };

  const handleStopChange = (location, index) => {
    const updatedStops = [...stops];
    updatedStops[index] = location; // Update the stop at the specific index
    setStops(updatedStops);
    handleInputChange("stops" + returnFlight, updatedStops); // Pass the updated stops array back to the parent component
  };

  return (
    <View style={styles.container}>
      {rideType === "arrival" && <Text style={styles.text}>מנתב"ג</Text>}
      <View style={styles.addressContainer}>
        <GooglePlacesInput
          onLocationSelect={(location) =>
            handleInputChange(
              rideType === "departure" || rideType === "both"
                ? "origin"
                : "destination",
              location
            )
          }
          placeholder={rideType === "arrival" ? "כתובת חזור" : "כתובת איסוף"}
        />
        {stops.map((_, index) => (
          <View key={index} style={styles.stopRow}>
            <GooglePlacesInput
              onLocationSelect={(location) => handleStopChange(location, index)}
              placeholder={`עצירה ${index + 1}`}
            />
            <TouchableOpacity
              onPress={() => removeStop(index)}
              style={styles.removeButton}
            >
              <MaterialIcons name="remove" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity onPress={addStop} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="black" />
        </TouchableOpacity>
        {rideType !== "arrival" && <Text style={styles.text}>לנתב"ג</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Center items vertically
    marginBottom: 10, // Adjust as necessary
  },
  addressContainer: {
    width: "70%",
  },
  stopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    padding: 10,
    alignItems: "center",
  },
  removeButton: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    paddingTop: 12,
    paddingBottom: 12,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: "flex-start",
  },
});

export default OneFlightLocationSelector;
