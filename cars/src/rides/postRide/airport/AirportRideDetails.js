import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const AirportRideDetails = ({
  flightNumber,
  numberOfSuitcases,
  handleInputChange,
  optionalTextForTitle,
}) => {
  const addStringToName = optionalTextForTitle == "חזור" ? "Return" : "";
  return (
    <View style={styles.container}>
      <Text style={styles.label}>פרטי הטיסה {optionalTextForTitle}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={flightNumber}
            onChangeText={(text) =>
              handleInputChange("flightNumber" + addStringToName, text)
            }
            placeholder="מספר טיסה"
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={numberOfSuitcases}
            onChangeText={(text) =>
              handleInputChange("numberOfSuitcases" + addStringToName, text)
            }
            placeholder="כמות מזוודות"
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default AirportRideDetails;
