import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GooglePlacesInput from "../../../components/GooglePlacesInput";

const { width, height } = Dimensions.get("window");

const AdditionDetailsModal = ({ handleCloseModal, ride }) => {
  const [origin, setOrigin] = useState(ride.origin.fullAddressName);
  const [destination, setDestination] = useState(
    ride.destination.fullAddressName
  );
  const [flightNumber, setFlightNumber] = useState(ride.flightNumber);
  const [returnFlightNumber, setReturnFlightNumber] = useState(
    ride.flightNumberReturn
  );
  const [notes, setNotes] = useState(ride.notes);

  const handleSend = () => {
    handleCloseModal(); // Close the modal after sending the data
  };

  return (
    <View
      style={styles.customModal}
      onStartShouldSetResponder={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>פרטים נוספים</Text>

        {/* Google Places Input Containers */}
        <View style={styles.googleInputsContainer}>
          <GooglePlacesInput onLocationSelect={() => {}} />
          <GooglePlacesInput onLocationSelect={() => {}} />
        </View>
        {/* Additional Details Inputs */}
        {flightNumber && (
          <TextInput
            value={flightNumber}
            onChangeText={setFlightNumber}
            placeholder="Flight Number"
            style={styles.input}
          />
        )}
        {returnFlightNumber && (
          <TextInput
            value={returnFlightNumber}
            onChangeText={setReturnFlightNumber}
            placeholder="Return Flight Number"
            style={styles.input}
          />
        )}
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes"
          style={styles.input}
        />

        {/* Action Buttons */}
        <Button title="Send" onPress={handleSend} />
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customModal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1000, // Ensure it covers other components
  },
  googleInputsContainer: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // If you want to ensure visibility against a potential dark background
    padding: 10, // Spacing inside the container
    height: 300,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdditionDetailsModal;
