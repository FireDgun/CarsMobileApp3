// RidePreviewPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import RidePreview from "./RidePreview";
import { useRidesContext } from "../../../providers/RidesContext";
import { getRideTypeHebrewName } from "../../../utils/ridesHelper";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthContext";

const RidePreviewPage = ({ route }) => {
  // Extract ride data from route params
  const [rideValidations, setRideValidations] = useState({});
  const { ride: serializedRide } = route.params;
  const ride = JSON.parse(serializedRide);
  const navigation = useNavigation();
  const { user } = useAuth();
  const { postNewRide } = useRidesContext();
  const navigateToMySellRides = async () => {
    if (validateRide(ride)) {
      await postNewRide({
        ...ride,
        type: getRideTypeHebrewName(ride.type),
        rideOwnerName: user.name,
        rideOwnerImage: user.profilePic,
      });
      navigation.navigate("Dashboard", { initialPage: "rides" });
    } else {
      console.log("Ride is not valid");
    }
  };
  const validateRide = (globalRide) => {
    const ride = JSON.parse(JSON.stringify(globalRide));
    console.log(ride);
    const validations = {};
    let flag = true;
    if (
      ride.date == null ||
      ride.date < new Date().toISOString().split("T")[0]
    ) {
      validations.date = { label: "תאריך", message: "התאריך שמילאת עבר" };
      flag = false;
    }
    if (!ride.numberOfPassengers) {
      validations.numberOfPassengers = {
        label: "מספר נוסעים",
        message: "חובה למלא מספר נוסעים",
      };
      flag = false;
    }
    if (!ride.openForOffers) {
      if (!ride.price) {
        validations.price = {
          label: "מחיר",
          message: "חובה למלא מחיר או לסמן שאתה רוצה לקבל הצעות מחיר",
        };
        flag = false;
      }
    }
    if (getRideTypeHebrewName(ride.type) == "נסיעה צמודה") {
      console.log(ride.tripLocations);
      ride.tripLocations.forEach((location, index) => {
        if (!location.origin || location.origin == "") {
          validations[`origin_${index}`] = {
            label: `מוצא ${index + 1}`,
            message: "חובה למלא מוצא",
          };
          console.log(validations);
          flag = false;
        }
        if (!location.destination || location.destination == "") {
          validations[`destination_${index}`] = {
            label: `יעד ${index + 1}`,
            message: "חובה למלא יעד",
          };
          flag = false;
        }
        if (!location.startTime) {
          validations[`startTime_${index}`] = {
            label: `שעת התחלה ${index + 1}`,
            message: "חובה למלא שעת התחלה",
          };
          flag = false;
        }
        if (!location.endTime) {
          validations[`endTime_${index}`] = {
            label: `שעת סיום ${index + 1}`,
            message: "חובה למלא שעת סיום",
          };
          flag = false;
        }
      });
    } else {
      if (!ride.startTime) {
        validations.startTime = {
          label: "שעת התחלה",
          message: "חובה למלא את שעת הנסיעה",
        };
        flag = false;
      }
      if (
        getRideTypeHebrewName(ride.type) == 'נתב"ג הלוך וחזור' ||
        getRideTypeHebrewName(ride.type) == "הקפצה הלוך וחזור"
      ) {
        if (!ride.endTime) {
          validations.endTime = {
            label: "שעת סיום",
            message: "חובה למלא את שעת החזרה",
          };
          flag = false;
        }
      }
      if (getRideTypeHebrewName(ride.type).includes('נתב"ג')) {
        if (
          getRideTypeHebrewName(ride.type) == 'נתב"ג נחיתה' ||
          getRideTypeHebrewName(ride.type) == 'נתב"ג הלוך וחזור'
        ) {
          if (!ride.destination || ride.destination == "") {
            validations.destination = {
              label: "יעד",
              message: "חובה למלא יעד",
            };
            flag = false;
          }
        }
        if (
          getRideTypeHebrewName(ride.type) == 'נסיעה לנתב"ג' ||
          getRideTypeHebrewName(ride.type) == 'נתב"ג הלוך וחזור'
        ) {
          if (!ride.origin || ride.origin == "") {
            validations.origin = { label: "מוצא", message: "חובה למלא מוצא" };
            flag = false;
          }
        }
      } else {
        if (!ride.origin || ride.origin == "") {
          validations.origin = { label: "מוצא", message: "חובה למלא מוצא" };
          flag = false;
        }
        if (!ride.destination || ride.destination == "") {
          validations.destination = { label: "יעד", message: "חובה למלא יעד" };
          flag = false;
        }
      }
      if (getRideTypeHebrewName(ride.type) == "קו קבוע") {
        if (!ride.frequency || ride.frequency == "") {
          validations.frequency = {
            label: "תדירות הקו",
            message: "חובה למלא תדירות",
          };
          flag = false;
        }
      }
    }

    setRideValidations(validations);
    return flag;
  };
  console.log(rideValidations);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>תצוגה מקדימה</Text>
      <RidePreview ride={ride} />
      <TouchableOpacity
        style={styles.navigateButton}
        onPress={navigateToMySellRides}
      >
        <Text style={styles.navigateButtonText}>שמור</Text>
      </TouchableOpacity>
      <ScrollView style={styles.validationContainer}>
        {Object.keys(rideValidations).map((key) => (
          <Text key={key} style={styles.validationText}>
            {rideValidations[key].label}: {rideValidations[key].message}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

// Add some basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginTop: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  navigateButton: {
    backgroundColor: "#4CAF50", // A different color to distinguish this button
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20, // Adjust as needed for spacing from the bottom
  },
  navigateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  validationContainer: {
    marginTop: 20,
  },
  validationText: {
    color: "red",
    marginBottom: 10,
  },
});

export default RidePreviewPage;
