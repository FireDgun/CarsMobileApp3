import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  { name: "directions-car", value: "option1" },
  { name: "child-care", value: "option2" },
];

const RequireDetails = ({
  numberOfPassengers,
  price,
  paymentMethod,
  handleInputChange,
  notes,
  specialOption,
  handleSpecialOptionChange,
}) => {
  return (
    <>
      <TextInput
        placeholder="מספר נוסעים"
        value={numberOfPassengers}
        onChangeText={(text) => handleInputChange("numberOfPassengers", text)}
        style={styles.input}
        keyboardType="numeric"
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

      <View style={styles.iconsContainer}>
        {specialOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSpecialOptionChange(option.value)}
          >
            <MaterialIcons
              name={option.name}
              size={24}
              color={specialOption.includes(option.value) ? "blue" : "black"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => handleInputChange("notes", text)}
        style={styles.input}
        multiline
      />
    </>
  );
};

export default RequireDetails;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: "#333",
    marginBottom: 15,
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
});
