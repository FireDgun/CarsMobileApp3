import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DatePickerComponent from "../components/DatePickerComponent";
import TwoTimesPickerComponent from "../components/TwoTimesPickerComponent ";
import ChooseOriginAndDestination from "../components/ChooseOriginAndDestination";
import RequireDetails from "../components/RequireDetails";
import usePostRide from "../../../hooks/usePostRide";

const PostJumpRide = () => {
  const { formData, handleInputChange, handleSpecialOptionChange } =
    usePostRide();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Jump Ride</Text>

      <View style={styles.section}>
        <DatePickerComponent
          date={formData.date}
          onDateChange={(selectedDate) =>
            handleInputChange("date", selectedDate)
          }
        />
      </View>

      <View style={styles.section}>
        <TwoTimesPickerComponent
          startTime={formData.startTime}
          endTime={formData.endTime}
          onStartTimeChange={(selectedTime) =>
            handleInputChange("startTime", selectedTime)
          }
          onEndTimeChange={(selectedTime) =>
            handleInputChange("endTime", selectedTime)
          }
        />
      </View>

      <View style={styles.section}>
        <ChooseOriginAndDestination
          origin={formData.origin}
          destination={formData.destination}
          handleInputChange={handleInputChange}
        />
      </View>

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

      <Button onPress={() => console.log(formData)} title="פרסם נסיעה" />
    </View>
  );
};

export default PostJumpRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
});
