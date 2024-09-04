import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DatePickerComponent from "../components/DatePickerComponent";
import TwoTimesPickerComponent from "../components/TwoTimesPickerComponent ";
import ChooseOriginAndDestination from "../components/ChooseOriginAndDestination";
import RequireDetails from "../components/RequireDetails";
import usePostRide from "../../../hooks/usePostRide";
import { useNavigation } from "@react-navigation/native";

const PostJumpRide = ({
  formData,
  handleInputChange,
  handleSpecialOptionChange,
}) => {
  const navigation = useNavigation();

  const [oneWay, setOneWay] = useState(true);
  useEffect(() => {
    handleInputChange("type", oneWay ? "jumpOneWay" : "jumpTwoWay");
  }, [oneWay]);
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <Text style={styles.title}>
        {oneWay ? "הקפצה כיוון אחד" : "הקפצה הלוך חזור"}
      </Text>
      <View style={styles.dateAndTimeContainer}>
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
            setOneWay={setOneWay}
          />
        </View>
      </View>
      <View style={styles.section}>
        <ChooseOriginAndDestination handleInputChange={handleInputChange} />
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
          openForOffers={formData.openForOffers}
        />
      </View>
      <TouchableOpacity
        style={styles.publishButton}
        onPress={() =>
          navigation.navigate("RidePreviewPage", {
            ride: JSON.stringify({
              ...formData,
              type: oneWay ? "jumpOneWay" : "jumpTwoWay",
            }),
          })
        }
      >
        <Text style={styles.publishButtonText}>פרסם נסיעה</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginTop: 40,
  },
  section: {
    marginBottom: 20,
  },
  dateAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
