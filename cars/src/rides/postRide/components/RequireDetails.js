import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Picker } from "@react-native-picker/picker";

// Define options array outside of the component for easy modification
const paymentOptions = [
  { label: "מזומן מהלקוח", value: "מזומן מהלקוח" },
  { label: "העברה בנקאית", value: "העברה בנקאית" },
  { label: "העברה בביט", value: "העברה בביט" },
];

const specialOptions = [
  { name: "work", value: "ויזה" },
  { name: "school", value: "אישור תלמידים" },
];

const RequireDetails = ({
  numberOfPassengers,
  price,
  paymentMethod,
  handleInputChange,
  notes,
  specialOption,
  handleSpecialOptionChange,
  optionalMarginTop,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  const toggleNotesSection = () => {
    setShowNotes(!showNotes);
  };

  return (
    <View style={{ marginTop: optionalMarginTop }}>
      <TextInput
        placeholder="מספר נוסעים"
        value={numberOfPassengers}
        onChangeText={(text) => handleInputChange("numberOfPassengers", text)}
        style={{ ...styles.input, marginBottom: 10 }}
        keyboardType="numeric"
        size={"small"}
      />

      <TextInput
        placeholder="מחיר"
        value={price}
        onChangeText={(text) => handleInputChange("price", text)}
        style={styles.input}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={paymentMethod}
        onValueChange={(itemValue) =>
          handleInputChange("paymentMethod", itemValue)
        }
        style={styles.picker}
      >
        {paymentOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
      <TouchableOpacity onPress={toggleNotesSection} style={styles.iconButton}>
        <MaterialIcons
          name={showNotes ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="gray"
        />
        <Text style={styles.iconButtonText}>
          {showNotes ? "פחות פרטים" : "פרטים נוספים"}
        </Text>
      </TouchableOpacity>

      {showNotes && (
        <View>
          <View style={styles.iconsContainer}>
            {specialOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSpecialOptionChange(option.value)}
                style={{ alignItems: "center" }}
              >
                <MaterialIcons
                  name={option.name}
                  size={24}
                  color={
                    specialOption.includes(option.value) ? "blue" : "black"
                  }
                />
                <Text>{option.value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="הערות נוספות"
            value={notes}
            onChangeText={(text) => handleInputChange("notes", text)}
            style={styles.input}
            multiline
          />
        </View>
      )}
    </View>
  );
};

export default RequireDetails;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    color: "#333",
    // Adjust height if necessary to match your design
    height: 35, // Set height to ensure consistency with other inputs
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  iconButton: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center items vertically in the button
    justifyContent: "center", // Center items horizontally in the button
    paddingVertical: 8, // Smaller padding for a more compact look
    paddingHorizontal: 12, // Padding to the left and right for space around text and icon
    backgroundColor: "#f0f0f0", // Light grey background for a subtle look
    borderRadius: 20, // Rounded corners for a softer look
    marginBottom: 10, // Adds a small margin above and below the button
    elevation: 2, // Adds a subtle shadow below the button for depth (Android)
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  iconButtonText: {
    color: "gray", // Text color to match the icon
    marginLeft: 5, // Space between the icon and the text
    fontSize: 16, // Font size for clarity and readability
  },
});
