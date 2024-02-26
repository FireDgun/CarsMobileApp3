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
import { useNavigation } from "@react-navigation/native";

const PostLineRide = () => {
  const [isOneTime, setIsOneTime] = useState(true);
  const [onWay, setOneWay] = useState(true);
  const navigation = useNavigation();

  const { formData, handleInputChange, handleSpecialOptionChange } =
    usePostRide(); // Assuming usePostRide provides necessary handlers

  const toggleSwitch = () => setIsOneTime((previousState) => !previousState);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.title}>
        {isOneTime ? "ביצוע חד פעמי של קו" : "פרסום קו קבוע"}
      </Text>
      <View style={styles.switchContainer}>
        {isOneTime ? <Text>חד פעמי</Text> : <Text>קו קבוע</Text>}
        <Switch
          trackColor={{ false: "#8fa1ff", true: "#ff8f8f" }} // Equal visual weight colors
          thumbColor={isOneTime ? "#ffd700" : "#00bfff"} // Distinct, but balanced colors
          ios_backgroundColor="#ddd" // Neutral color for the background
          onValueChange={toggleSwitch}
          value={isOneTime}
        />
      </View>
      <View style={styles.dateAndTimeContainer}>
        <View>
          <DatePickerComponent
            date={formData.date}
            onDateChange={(selectedDate) =>
              handleInputChange("date", selectedDate)
            }
            label={isOneTime ? "בחר תאריך" : "תאריך תחילת קו"}
          />
        </View>
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
      </View>
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
        <ChooseOriginAndDestination handleInputChange={handleInputChange} />
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
        onPress={() =>
          navigation.navigate("RidePreviewPage", {
            ride: JSON.stringify({
              ...formData,
              type: isOneTime ? "oneTimeLine" : "lineRide",
            }),
          })
        }
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
  dateAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 40,
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
