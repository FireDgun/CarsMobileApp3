import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
const apiKey = Constants.expoConfig.android.config.googleMaps.apiKey;
const GooglePlacesInput = ({ onLocationSelect, placeholder }) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView, // Style for the container of the autocomplete results
          row: styles.row, // Style for the individual result items
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log(data, details); // Log data and details for debugging

          // 'details' is provided when fetchDetails = true
          const location = details.geometry.location;
          onLocationSelect({
            latitude: location.lat,
            longitude: location.lng,
          });
        }}
        query={{
          key: apiKey,
          language: "en",
        }}
        onFail={(error) =>
          console.error("GooglePlacesAutocomplete Error:", error)
        }
        textInputProps={{
          onChangeText: (text) => {
            console.log("Input text:", text);
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15, // Adjust based on your layout needs
  },
  textInputContainer: {
    backgroundColor: "transparent", // Adjust as needed
    borderTopWidth: 0, // Remove top border
    borderBottomWidth: 0, // Remove bottom border
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    color: "#333",
    // Adjust height if necessary to match your design
    height: 50, // Set height to ensure consistency with other inputs
  },
  listView: {
    borderWidth: 1,
    zIndex: 100, // Ensure it's rendered above other components
    elevation: 10, // For Android to ensure it's above other components
    height: 200,
    position: "absolute",
    top: 60, // Adjust this value so that the list drops down from the input
    left: 0,
    right: 0,
  },
  row: {
    backgroundColor: "white", // Or any contrasting color for visibility
  },
});

export default GooglePlacesInput;
