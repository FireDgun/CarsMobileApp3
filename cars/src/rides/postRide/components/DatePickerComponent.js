// DatePickerComponent.js
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePickerComponent = ({ date, onDateChange, label = "בחר תאריך" }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerStyle}
      >
        <MaterialIcons name="calendar-today" size={20} color="#000" />
        <Text style={styles.datePickerText}>
          {date ? date.toLocaleDateString() : label}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            onDateChange(selectedDate);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  datePickerStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    marginLeft: 10,
  },
});

export default DatePickerComponent;
