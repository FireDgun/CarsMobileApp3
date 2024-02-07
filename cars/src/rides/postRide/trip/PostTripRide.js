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

const PostTripRide = () => {
  const {
    formData,
    handleInputChange,
    handleUpdateTripData,
    handleSpecialOptionChange,
    setFormData,
  } = usePostRide();
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Effect to adjust tripLocations array size
  useEffect(() => {
    const start = new Date(formData.date);
    const end = formData.endDate ? new Date(formData.endDate) : start;
    let dayDifference = (end - start) / (1000 * 3600 * 24);
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

  // Function to calculate the number of days between startDate and endDate
  const calculateDaysArray = () => {
    let daysArray = [];
    let currentDay = new Date(formData.date);
    let endDate = new Date(formData.endDate);
    if (formData.endDate) {
      while (currentDay <= endDate) {
        daysArray.push(new Date(currentDay));
        currentDay.setDate(currentDay.getDate() + 1);
      }
    } else {
      daysArray.push(new Date(currentDay));
    }
    return daysArray;
  };

  // Render ChooseOriginAndDestination for each day
  const renderTripLocationSelectors = () => {
    const daysArray = calculateDaysArray();
    return daysArray.map((day, index) => (
      <View key={index + day}>
        <ChooseOriginAndDestination
          origin={formData.tripLocations[index]?.origin || ""}
          destination={formData.tripLocations[index]?.destination || ""}
          handleInputChange={(field, value) =>
            handleUpdateTripData(value, index, field)
          }
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
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.section}>
        <DatePickerComponent
          date={formData.date}
          onDateChange={(selectedDate) =>
            handleInputChange("date", selectedDate)
          }
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setShowEndDatePicker(!showEndDatePicker),
              handleInputChange("endDate", null);
          }}
        >
          {/* Icon Button (Toggle Date) */}
          <Text style={styles.addButtonText}>
            {showEndDatePicker ? "Hide" : "Add"} End Date
          </Text>
        </TouchableOpacity>
        {showEndDatePicker && (
          <DatePickerComponent
            date={formData.endDate}
            onDateChange={(selectedDate) =>
              handleInputChange("endDate", selectedDate)
            }
          />
        )}
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
        onPress={() => console.log(formData)}
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
    fontSize: 16,
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
