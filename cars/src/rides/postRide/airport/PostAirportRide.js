import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import DatePickerComponent from "../components/DatePickerComponent";
import AirportRideDetails from "./AirportRideDetails";
import usePostRide from "../../../hooks/usePostRide";
import TimePickerComponent from "../components/TimePickerComponent ";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import RequireDetails from "../components/RequireDetails";
import RideTypeSelector from "./RideTypeSelector";
import OneFlightLocationSelector from "./OneFlightLocationSelector";
import { useNavigation } from "@react-navigation/native";

const PostAirportRide = () => {
  const { formData, handleInputChange, handleSpecialOptionChange } =
    usePostRide();
  const [rideType, setRideType] = useState("arrival"); // Can be 'arrival', 'departure', or 'both'
  const navigation = useNavigation();
  useEffect(() => {
    handleInputChange("origin", "");
    handleInputChange("destination", "");
  }, [rideType]);
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>נתב"ג</Text>
      <RideTypeSelector rideType={rideType} setRideType={setRideType} />

      <View style={styles.section}>
        <AirportRideDetails
          flightNumber={formData.flightNumber}
          numberOfSuitcases={formData.numberOfSuitcases}
          handleInputChange={handleInputChange}
          optionalTextForTitle={rideType == "both" ? "הלוך" : ""}
        />
        <OneFlightLocationSelector
          rideType={rideType}
          handleInputChange={handleInputChange}
          stops={formData.stops}
        />

        <DatePickerComponent
          date={formData.date}
          onDateChange={(selectedDate) =>
            handleInputChange("date", selectedDate)
          }
        />
        <TimePickerComponent
          time={formData.startTime}
          onTimeChange={(selectedTime) =>
            handleInputChange("startTime", selectedTime)
          }
          label={rideType === "arrival" ? "שעת נחיתה" : "שעת איסוף"}
        />

        {rideType === "both" && (
          <>
            <AirportRideDetails
              flightNumber={formData.flightNumberReturn}
              numberOfSuitcases={formData.numberOfSuitcasesReturn}
              handleInputChange={handleInputChange}
              optionalTextForTitle={"חזור"}
            />

            <OneFlightLocationSelector
              rideType={"arrival"}
              handleInputChange={handleInputChange}
              stops={formData.stopsReturn}
              returnFlight={"Return"}
            />
            <DatePickerComponent
              date={formData.endDate}
              onDateChange={(selectedDate) =>
                handleInputChange("endDate", selectedDate)
              }
            />
            <TimePickerComponent
              time={formData.endTime}
              onTimeChange={(selectedTime) =>
                handleInputChange("endTime", selectedTime)
              }
              label="שעת נחיתה"
            />
          </>
        )}

        <RequireDetails
          numberOfPassengers={formData.numberOfPassengers}
          price={formData.price}
          paymentMethod={formData.paymentMethod}
          handleInputChange={handleInputChange}
          notes={formData.notes}
          specialOption={formData.specialOption}
          handleSpecialOptionChange={handleSpecialOptionChange}
          optionalMarginTop={40}
        />
      </View>
      <TouchableOpacity
        style={styles.publishButton}
        onPress={() =>
          navigation.navigate("RidePreviewPage", {
            ride: JSON.stringify({
              ...formData,
              type:
                rideType == "arrival"
                  ? "airportArrival"
                  : rideType == "departure"
                  ? "airportDeparture"
                  : "airportBoth",
            }),
          })
        }
      >
        <Text style={styles.publishButtonText}>פרסם נסיעה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
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
  },
  publishButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostAirportRide;
