import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput"; // Adjust path as necessary
import { MaterialIcons } from "@expo/vector-icons"; // Ensure you have expo-vector-icons installed

const ChooseOriginAndDestination = ({
  defaultOrigin,
  defaultDestination,
  defaultStops,
  handleInputChange,
  stops: initialStops,
}) => {
  const [stops, setStops] = useState(initialStops);

  const addStop = () => {
    setStops([...stops, ""]); // Add a new empty stop
  };

  const removeStop = (index) => {
    const updatedStops = stops.filter((_, idx) => idx !== index);
    setStops(updatedStops);
    handleInputChange("stops", updatedStops); // Update the parent component's state
  };

  const handleStopChange = (location, index) => {
    const updatedStops = [...stops];
    updatedStops[index] = location; // Update the stop at the specific index
    setStops(updatedStops);
    handleInputChange("stops", updatedStops); // Update the parent component's state
  };

  return (
    <>
      <GooglePlacesInput
        onLocationSelect={(location) => handleInputChange("origin", location)}
        placeholder="מוצא"
        defaultValue={defaultOrigin}
      />
      {stops.map((stop, index) => (
        <View key={index} style={styles.stopRow}>
          <GooglePlacesInput
            onLocationSelect={(location) => handleStopChange(location, index)}
            placeholder={`עצירה ${index + 1}`}
            defaultValue={defaultStops[index]}
          />
          <TouchableOpacity
            onPress={() => removeStop(index)}
            style={styles.removeButton}
          >
            <MaterialIcons name="remove" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <GooglePlacesInput
        onLocationSelect={(location) =>
          handleInputChange("destination", location)
        }
        placeholder="יעד"
        defaultValue={defaultDestination}
      />
      <TouchableOpacity onPress={addStop} style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="black" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // Your styles here
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
});

export default ChooseOriginAndDestination;
