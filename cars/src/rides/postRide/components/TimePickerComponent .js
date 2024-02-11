// TimePickerComponent.js
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatTime } from "../../../utils/ridesHelper";

const TimePickerComponent = ({ time, onTimeChange, label }) => {
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.timePickerStyle}
      >
        <MaterialIcons name="access-time" size={20} color="#000" />
        <Text style={styles.timePickerText}>{formatTime(time, label)}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time ?? new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            onTimeChange(selectedTime);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  timePickerStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  timePickerText: {
    marginLeft: 10,
  },
});

export default TimePickerComponent;
