import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DatePickerComponent from "../components/DatePickerComponent";
import ChooseOriginAndDestination from "../components/ChooseOriginAndDestination";
import RequireDetails from "../components/RequireDetails";
import usePostRide from "../../../hooks/usePostRide";
import TwoTimesPickerComponent from "../components/TwoTimesPickerComponent ";
import { calculateDaysArray } from "../../../utils/ridesHelper";
import { MaterialIcons } from "@expo/vector-icons";
import Divider from "../../../components/Divider";
import { formatDateInHebrew } from "../../../utils/datesHelper";

// Function to calculate the number of days between startDate and endDate

const PostTripRide = () => {
  const {
    formData,
    handleInputChange,
    handleUpdateTripData,
    handleSpecialOptionChange,
    setFormData,
  } = usePostRide();
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [endDateError, setEndDateError] = useState("");

  // Effect to adjust tripLocations array size
  useEffect(() => {
    const start = new Date(formData.date);
    const end = formData.endDate ? new Date(formData.endDate) : start;
    let dayDifference = (end - start) / (1000 * 3600 * 24);
    if (dayDifference < 0) {
      setEndDateError("תאריך סיום חייב להיות אחרי התאריך התחלה");
      return;
    } else {
      setEndDateError(""); // Clear error if the condition is fixed
    }
    if (dayDifference > 0) {
      dayDifference++;
      // Make sure we have the correct number of trip locations
      let newTripLocations = formData.tripLocations;

      if (dayDifference > formData.tripLocations.length) {
        let daysToAdd = dayDifference - formData.tripLocations.length;
        for (let i = 0; i < daysToAdd; i++) {
          newTripLocations.push({
            origin: "",
            destination: "",
            startTime: null,
            endTime: null,
          });
        }
      } else {
        newTripLocations = newTripLocations.slice(0, dayDifference);
      }

      setFormData((prev) => ({
        ...prev,
        tripLocations: newTripLocations,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        tripLocations: [
          { origin: "", destination: "", startTime: null, endTime: null },
        ],
      }));
    }
  }, [formData.date, formData.endDate]);

  // Render ChooseOriginAndDestination for each day
  const renderTripLocationSelectors = () => {
    const daysArray = calculateDaysArray(formData);
    return daysArray.map((day, index) => (
      <View key={index + day} style={{ marginBottom: 16 }}>
        <Text style={styles.dayTitle}>
          יום טיול {index + 1} - {formatDateInHebrew(day)}
        </Text>
        <ChooseOriginAndDestination
          origin={formData.tripLocations[index]?.origin || ""}
          destination={formData.tripLocations[index]?.destination || ""}
          handleInputChange={(field, value) =>
            handleUpdateTripData(value, index, field)
          }
          stops={formData.stops}
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
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>הסעה צמודה</Text>
      <View style={styles.dateSection}>
        <View style={styles.dateContainer}>
          <DatePickerComponent
            date={formData.date}
            onDateChange={(selectedDate) =>
              handleInputChange("date", selectedDate)
            }
          />
        </View>
        {showEndDatePicker && (
          <View style={styles.dateContainer}>
            <DatePickerComponent
              date={formData.endDate}
              onDateChange={(selectedDate) =>
                handleInputChange("endDate", selectedDate)
              }
            />
            {endDateError ? (
              <Text style={styles.errorText}>{endDateError}</Text>
            ) : null}
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setShowEndDatePicker(!showEndDatePicker),
              handleInputChange("endDate", null);
          }}
        >
          <MaterialIcons
            name={showEndDatePicker ? "remove" : "add-circle-outline"}
            size={24}
            color="#007bff"
          />
          {!showEndDatePicker && (
            <Text style={styles.addButtonText}>חזור בתאריך אחר</Text>
          )}
        </TouchableOpacity>
      </View>

      {renderTripLocationSelectors()}

      <View style={styles.section}>
        <RequireDetails
          numberOfPassengers={formData.numberOfPassengers}
          price={formData.price}
          paymentMethod={formData.paymentMethod}
          handleInputChange={handleInputChange}
          notes={formData.notes}
          specialOption={formData.specialOption}
          handleSpecialOptionChange={handleSpecialOptionChange}
        />
      </View>

      <TouchableOpacity
        style={styles.publishButton}
        onPress={() => console.log(JSON.stringify(formData))}
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
  dayTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  errorText: {
    color: "red", // Change as needed
    marginTop: 4,
    // Add other styling for your error text
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
  dateSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dateContainer: {
    flex: 1,
    marginRight: 10, // Add some space between the date pickers
  },
  addButton: {
    backgroundColor: "#e7e7e7",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#007bff",
    fontSize: 12,
  },
  tripLocationContainer: {
    marginBottom: 20,
  },
  publishButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20, // Add some space above the publish button
  },
  publishButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PostTripRide;
