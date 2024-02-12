import React, { useState } from "react";
import { View, Text, Switch, TextInput, StyleSheet } from "react-native";

const FrequencyComponent = ({
  handleInputChange,
  fieldName,
  optionalTitleText = "",
}) => {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const [selectedDays, setSelectedDays] = useState(new Array(7).fill(false));
  const [isOther, setIsOther] = useState(false);
  const [otherText, setOtherText] = useState("");

  const handleDaySelection = (index) => {
    const updatedSelectedDays = selectedDays.map((item, idx) =>
      idx === index ? !item : item
    );
    setSelectedDays(updatedSelectedDays);
    // Convert selected days into a string to pass to the parent component
    const daysString = updatedSelectedDays
      .map((isSelected, idx) => (isSelected ? daysOfWeek[idx] : null))
      .filter(Boolean)
      .join(", ");
    handleInputChange(fieldName, daysString);
  };

  const handleOtherChange = (text) => {
    setOtherText(text);
    handleInputChange(fieldName, text);
  };

  const toggleOther = () => {
    setIsOther(!isOther);
    // Clear the non-active field when toggling
    if (!isOther) {
      // Switching to "Other", clear days selection
      setSelectedDays(new Array(7).fill(false));
    } else {
      // Switching back to days selection, clear "Other"
      setOtherText("");
    }
    handleInputChange(fieldName, "");
  };

  return (
    <View style={styles.container}>
      {/* <Switch
        value={isOther}
        onValueChange={toggleOther}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isOther ? "#f5dd4b" : "#f4f3f4"}
      /> */}
      <Text style={styles.label}>
        {isOther ? "טקסט חופשי" : "בחר ימים"}
        {optionalTitleText}
      </Text>

      {!isOther ? (
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.dayRow}>
              <Text style={styles.dayText}>{day}</Text>
              <Switch
                value={selectedDays[index]}
                onValueChange={() => handleDaySelection(index)}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={selectedDays[index] ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
          ))}
        </View>
      ) : (
        <TextInput
          style={styles.textInput}
          onChangeText={handleOtherChange}
          value={otherText}
          placeholder="פרט כל כמה זמן יש לבצע את הקו"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor="#999"
          textAlign="right"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  daysContainer: {
    marginBottom: 20,
  },
  dayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dayText: {
    fontSize: 16,
  },
  otherContainer: {
    marginTop: 10,
  },
  textInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "right", // For RTL languages like Hebrew
  },
});

export default FrequencyComponent;
