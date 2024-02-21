import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
const apiKey = Constants.expoConfig.android.config.googleMaps.apiKey;
function removeOrReplaceLastOccurrence(text, search, replaceWith = "") {
  const lastIndex = text.lastIndexOf(search);
  if (lastIndex === -1) {
    // The search string was not found
    return text;
  }
  // If the search string appears more than once, replace the last occurrence
  // Otherwise, remove it (which is effectively replacing it with an empty string)
  return (
    text.substring(0, lastIndex) +
    replaceWith +
    text.substring(lastIndex + search.length)
  );
}
const GooglePlacesInput = ({ onLocationSelect, placeholder }) => {
  const ref = useRef();
  const [addressDetails, setAddressDetails] = useState({});
  console.log(addressDetails);
  const [isFullAddress, setIsFullAddress] = useState(false);

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
          try {
            const currentAddressText = ref.current?.getAddressText();
            const city = details?.address_components?.filter(
              (f) =>
                JSON.stringify(f?.types) ===
                JSON.stringify(["locality", "political"])
            )?.[0]?.short_name;
            const location = details.geometry.location;
            onLocationSelect({
              addressName:
                city ||
                removeOrReplaceLastOccurrence(currentAddressText, ", ישראל"),
              fullAddressName: removeOrReplaceLastOccurrence(
                currentAddressText,
                ", ישראל"
              ),
              data: {
                latitude: location.lat,
                longitude: location.lng,
              },
            });
            setAddressDetails({
              addressName:
                city ||
                removeOrReplaceLastOccurrence(currentAddressText, ", ישראל"),
              fullAddressName: removeOrReplaceLastOccurrence(
                currentAddressText,
                ", ישראל"
              ),
              data: {
                latitude: location.lat,
                longitude: location.lng,
              },
            });
          } catch (error) {
            console.error("GooglePlacesAutocomplete Error:", error);
          }
        }}
        query={{
          key: apiKey,
          language: "he",
          components: "country:IL",
        }}
        onFail={(error) =>
          console.error("GooglePlacesAutocomplete Error:", error)
        }
        debounce={300}
      />
      <View style={styles.buttonContainer}>
        <Text style={styles.addressText}>כתובת לפרסום:</Text>
        <Text style={styles.addressText}>
          {isFullAddress
            ? addressDetails.fullAddressName
            : addressDetails.addressName}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onLocationSelect({
              addressName: isFullAddress
                ? addressDetails.addressName
                : addressDetails.fullAddressName,
              fullAddressName: addressDetails.fullAddressName,
              data: addressDetails.data,
            });
            setIsFullAddress((prev) => !prev);
          }}
        >
          <Text style={styles.buttonText}>פרסם עם</Text>
          <Text style={styles.buttonText}>
            כתובת {isFullAddress ? "מקוצרת" : "מלאה"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  addressText: {
    textAlign: "center",
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    marginBottom: 5, // Adjust based on your layout needs
    flexDirection: "row",
    alignItems: "center",
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
