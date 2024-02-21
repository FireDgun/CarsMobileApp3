import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import OneFlightLocationSelector from "../../postRide/airport/OneFlightLocationSelector";
import ChooseOriginAndDestination from "../../postRide/components/ChooseOriginAndDestination";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  customModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  googleInputsContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    padding: 10,
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
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    justifyContent: "center", // Moved from customModal
    alignItems: "center", // Moved from customModal
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
  section: {
    marginBottom: 20,
    width: "100%",
    height: 150,
    justifyContent: "space-between",
  },
});

function AdditionDetailsModal({ handleCloseModal, ride }) {
  const [origin, setOrigin] = useState(ride.origin.fullAddressName);
  const [destination, setDestination] = useState(
    ride.destination.fullAddressName
  );
  const [stops, setStops] = useState(ride.stops);
  const [stopsReturn, setStopsReturn] = useState(ride.stopsReturn);
  const [tripLocations, setTripLocations] = useState(ride.tripLocations);
  const [flightNumber, setFlightNumber] = useState(ride.flightNumber);
  const [returnFlightNumber, setReturnFlightNumber] = useState(
    ride.flightNumberReturn
  );
  const [notes, setNotes] = useState(ride.notes);
  console.log(ride.stops);
  return (
    <ScrollView
      onStartShouldSetResponder={handleCloseModal}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.contentContainer} // Apply layout styles here
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>פרטים נוספים</Text>
        <View style={styles.section}>
          {!ride.type.includes('נתב"ג') && !ride.type !== "נסיעה צמודה" && (
            <ChooseOriginAndDestination
              stops={ride.stops}
              defaultStops={ride.stops}
              defaultOrigin={origin}
              defaultDestination={destination}
              handleInputChange={() => {}}
            />
          )}
        </View>
        <View style={styles.googleInputsContainer}>
          {ride.type.includes('נתב"ג') && (
            <>
              <OneFlightLocationSelector
                rideType={
                  ride.type === 'נסיעה לנתב"ג' ? "departure" : "arrival"
                }
                defaultAddress={origin}
                onInputChange={() => {}}
                stops={stops}
              />
              <TextInput
                value={flightNumber}
                onChangeText={setFlightNumber}
                placeholder="מספר טיסה"
                style={styles.input}
              />
            </>
          )}
          {ride.type === 'נתב"ג הלוך וחזור' && (
            <>
              <OneFlightLocationSelector
                rideType="arrival"
                onInputChange={() => {}}
                stops={stopsReturn}
                returnFlight="Return"
                defaultAddress={destination}
              />
              <TextInput
                value={returnFlightNumber}
                onChangeText={setReturnFlightNumber}
                placeholder="מספר טיסה חזרה"
                style={styles.input}
              />
            </>
          )}
        </View>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="פרטים נוספים"
          style={styles.input}
        />
        <Button title="שלח פרטים נוספים" onPress={handleCloseModal} />
      </View>
    </ScrollView>
  );
}

export default AdditionDetailsModal;
