import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import usePostRide from "../../../hooks/usePostRide";
import DatePickerComponent from "../components/DatePickerComponent";
import TwoTimesPickerComponent from "../components/TwoTimesPickerComponent ";
import ChooseOriginAndDestination from "../components/ChooseOriginAndDestination";
import RequireDetails from "../components/RequireDetails";
import FrequencyComponent from "./FrequencyComponent";

const PostLineRide = () => {
  const [isOneTime, setIsOneTime] = useState(true);
  const [onWay, setOneWay] = useState(true);

  const { formData, handleInputChange, handleSpecialOptionChange } =
    usePostRide(); // Assuming usePostRide provides necessary handlers

  const toggleSwitch = () => setIsOneTime((previousState) => !previousState);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View style={styles.switchContainer}>
        {isOneTime ? <Text>חד פעמי</Text> : <Text>קו קבוע</Text>}
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isOneTime ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isOneTime}
        />
      </View>

      <DatePickerComponent
        date={formData.date}
        onDateChange={(selectedDate) => handleInputChange("date", selectedDate)}
        label={isOneTime ? "בחר תאריך" : "תאריך תחילת קו"}
      />
      <TwoTimesPickerComponent
        startTime={formData.startTime}
        endTime={formData.endTime}
        onStartTimeChange={(selectedTime) =>
          handleInputChange("startTime", selectedTime)
        }
        onEndTimeChange={(selectedTime) =>
          handleInputChange("endTime", selectedTime)
        }
        setOneWay={setOneWay}
      />
      {!isOneTime && (
        <FrequencyComponent
          handleInputChange={handleInputChange}
          fieldName="frequency"
          optionalTitleText="- הלוך"
        />
      )}

      {!onWay && !isOneTime && (
        <>
          <FrequencyComponent
            handleInputChange={handleInputChange}
            fieldName="returnFrequency"
            optionalTitleText="- חזור"
          />
        </>
      )}
      <View style={styles.section}>
        <ChooseOriginAndDestination
          origin={formData.origin}
          destination={formData.destination}
          handleInputChange={handleInputChange}
          stops={formData.stops}
        />
      </View>
      <RequireDetails
        numberOfPassengers={formData.numberOfPassengers}
        price={formData.price}
        paymentMethod={formData.paymentMethod}
        handleInputChange={handleInputChange}
        notes={formData.notes}
        specialOption={formData.specialOption}
        handleSpecialOptionChange={handleSpecialOptionChange}
      />

      <TouchableOpacity
        style={styles.publishButton}
        onPress={() => console.log(formData)} // Replace with actual submit logic
      >
        <Text style={styles.publishButtonText}>Publish Ride</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
    flexDirection: "column", // Add this line
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  publishButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  // You might want to add more styles for other components
});

export default PostLineRide;
