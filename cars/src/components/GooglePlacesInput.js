import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
const apiKey = Constants.expoConfig.android.config.googleMaps.apiKey;
const GooglePlacesInput = ({
  onLocationSelect,
  placeholder,
  handleInputChange,
  setIsScrollEnabled,
}) => {
  const ref = useRef();
  const [addressText, setAddressText] = useState("");

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={placeholder}
        disableScroll={true}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
        }}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // Use ref to get the current address text
          const currentAddressText = ref.current?.getAddressText();
          setAddressText(currentAddressText);

          // 'details' is provided when fetchDetails = true
          const location = details.geometry.location;
          onLocationSelect({
            addressName: currentAddressText,
            data: {
              latitude: location.lat,
              longitude: location.lng,
            },
          });
        }}
        query={{
          key: apiKey,
          language: "en",
          components: "country:IL",
        }}
        onFail={(error) =>
          console.error("GooglePlacesAutocomplete Error:", error)
        }
        textInputProps={{
          onChangeText: (text) => {
            setAddressText(text);
          },
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 5, // Adjust based on your layout needs
  },
  textInputContainer: {
    backgroundColor: "transparent", // Adjust as needed
    borderTopWidth: 0, // Remove top border
    borderBottomWidth: 0, // Remove bottom border
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    color: "#333",
    // Make sure the height here matches with your text elements if they are on the same row
    height: 50, // Adjust as necessary to match the height of other elements
    // Add any additional styling to match the design of text elements
  },
  listView: {
    borderWidth: 1,
    zIndex: 1000, // Ensure it's rendered above other components
    elevation: 100, // For Android to ensure it's above other components
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
