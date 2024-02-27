import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import OneFlightLocationSelector from "../../postRide/airport/OneFlightLocationSelector";
import ChooseOriginAndDestination from "../../postRide/components/ChooseOriginAndDestination";
import { calculateDaysArray } from "../../../utils/ridesHelper";
import { formatDateInHebrew } from "../../../utils/datesHelper";
import TwoTimesPickerComponent from "../../postRide/components/TwoTimesPickerComponent ";
import Divider from "../../../components/Divider";
import usePostRide from "../../../hooks/usePostRide";
import { useRidesContext } from "../../../providers/RidesContext";

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
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
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
    backgroundColor: "white",
    padding: 20,
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
    width: "90%",
  },
  section: {
    marginBottom: 20,
    width: "90%",
    justifyContent: "space-between",
  },
  centeredModal: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "white", // Assuming you want a white background
  },
  rideType: {
    fontSize: 16,
    marginBottom: 10,
  },
});

function AdditionDetailsModal({ handleCloseModal, ride }) {
  const { formData, handleInputChange, handleUpdateTripData } =
    usePostRide(ride);
  const [notes, setNotes] = useState(ride.notes || "");
  const { updateRide } = useRidesContext();
  const handleSendFullDetails = () => {
    console.log(JSON.stringify(formData));
    if (JSON.stringify(formData) !== JSON.stringify(ride)) {
      console.log("editing ride on db");
      updateRide(ride.id, formData);
    }

    handleCloseModal();
  };

  const renderTripLocationSelectors = () => {
    const daysArray = calculateDaysArray(ride);
    return daysArray.map((day, index) => (
      <View key={index + day} style={{ marginBottom: 16 }}>
        <Text style={styles.dayTitle}>
          יום טיול {index + 1} - {formatDateInHebrew(day)}
        </Text>
        <ChooseOriginAndDestination
          defaultOrigin={ride.tripLocations[index]?.origin.fullAddressName}
          defaultDestination={
            ride.tripLocations[index]?.destination.fullAddressName
          }
          handleInputChange={(field, value) =>
            handleUpdateTripData(value, index, field, true)
          }
          defaultStops={ride.tripLocations[index]?.stops}
          showShowFullAddress={false}
        />
        <TwoTimesPickerComponent
          startTime={formData.tripLocations[index]?.startTime}
          endTime={formData.tripLocations[index]?.endTime}
          onStartTimeChange={(selectedTime) =>
            handleUpdateTripData(selectedTime, index, "startTime")
          }
          onEndTimeChange={(selectedTime) =>
            handleUpdateTripData(selectedTime, index, "endTime")
          }
          startTimeLabel={"שעת התייצבות"}
          endTimeLabel={"שעת סיום"}
          onlyTwoTimes={true}
        />
        <Divider style={{ marginTop: 16 }} />
      </View>
    ));
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      style={{ marginBottom: 100, width: "90%" }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 25,
        paddingTop: 25,
      }}
    >
      <Text style={styles.rideType}>סוג הנסיעה: {ride.type}</Text>
      <Text style={styles.modalTitle}>כתובות מדויקות</Text>
      {!ride.type.includes('נתב"ג') && ride.type !== "נסיעה צמודה" && (
        <View style={styles.googleInputsContainer}>
          <ChooseOriginAndDestination
            defaultStops={formData.stops}
            defaultOrigin={formData.origin.fullAddressName}
            defaultDestination={formData.destination.fullAddressName}
            handleInputChange={(field, value) =>
              handleInputChange(field, value, true)
            }
            showShowFullAddress={false}
          />
        </View>
      )}
      <View style={styles.googleInputsContainer}>
        {ride.type.includes('נתב"ג') && (
          <>
            <OneFlightLocationSelector
              rideType={ride.type === 'נתב"ג נחיתה' ? "arrival" : "departure"}
              defaultAddress={
                ride.type === 'נתב"ג נחיתה'
                  ? formData.destination.fullAddressName
                  : formData.origin.fullAddressName
              }
              handleInputChange={(field, value) =>
                handleInputChange(field, value, true)
              }
              defaultStops={formData.stops}
              showShowFullAddress={false}
            />
            <TextInput
              value={formData.flightNumber}
              placeholder="מספר טיסה"
              style={styles.input}
              onChangeText={(text) => handleInputChange("flightNumber", text)}
            />
          </>
        )}
        {ride.type === 'נתב"ג הלוך וחזור' && (
          <>
            <OneFlightLocationSelector
              rideType="arrival"
              handleInputChange={(field, value) =>
                handleInputChange(field, value, true)
              }
              defaultStops={formData.stopsReturn}
              returnFlight="Return"
              defaultAddress={formData.destination.fullAddressName}
              showShowFullAddress={false}
            />
            <TextInput
              value={formData.flightNumberReturn}
              placeholder="מספר טיסה חזרה"
              style={styles.input}
              onChangeText={(text) =>
                handleInputChange("flightNumberReturn", text)
              }
            />
          </>
        )}
        {ride.type == "נסיעה צמודה" && renderTripLocationSelectors()}
      </View>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="פרטים נוספים"
        style={styles.input}
      />
      <Button title="שלח פרטים נוספים" onPress={handleSendFullDetails} />
    </ScrollView>
  );
}

export default AdditionDetailsModal;
