// TwoTimesPickerComponent.js
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TimePickerComponent from "./TimePickerComponent ";

const TwoTimesPickerComponent = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  setOneWay,
}) => {
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showEndTimeField, setShowEndTimeField] = useState(false);

  const toggleEndTimeField = () => {
    setShowEndTimeField((prev) => !prev);
    setOneWay((prev) => !prev);
    if (showEndTimeField) {
      onEndTimeChange(null);
    }
  };

  return (
    <View>
      <TimePickerComponent
        time={startTime}
        onTimeChange={onStartTimeChange}
        showTimePicker={showStartTimePicker}
        setShowTimePicker={setShowStartTimePicker}
        label={"שעת התייצבות"}
      />
      {showEndTimeField && (
        <TimePickerComponent
          time={endTime}
          onTimeChange={onEndTimeChange}
          showTimePicker={showEndTimePicker}
          setShowTimePicker={setShowEndTimePicker}
          label={"שעת חזור"}
        />
      )}
      <TouchableOpacity
        onPress={toggleEndTimeField}
        style={styles.toggleButton}
      >
        <Text>{showEndTimeField ? "הסר שעת חזור" : "הוסף שעת חזור"}</Text>
        <MaterialIcons
          name={
            showEndTimeField ? "remove-circle-outline" : "add-circle-outline"
          }
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default TwoTimesPickerComponent;
