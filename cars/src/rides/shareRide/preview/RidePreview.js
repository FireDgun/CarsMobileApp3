import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { formatTime, getRideTypeHebrewName } from "../../../utils/ridesHelper";
import { MaterialIcons } from "@expo/vector-icons";

const RidePreview = ({ ride }) => {
  // Helper functions to format and display data
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);

  const formatDate = (dateString) => {
    return dateString
      ? new Date(dateString).toLocaleDateString("he-IL")
      : "N/A";
  };

  const formatAddress = (address) => {
    return address ? address.addressName : "N/A";
  };
  const renderStopsModal = () => (
    <Modal
      visible={showStopsModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowStopsModal(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>עצירות בדרך:</Text>
        {stopsToDisplay.map((stop, index) => (
          <Text key={index} style={styles.modalStopText}>
            {stop.addressName}
          </Text>
        ))}
        <TouchableOpacity
          onPress={() => setShowStopsModal(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>סגור</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
  // Main function to render ride details based on type
  const renderRideDetails = () => {
    const {
      type,
      date,
      destination,
      origin,
      stops,
      startTime,
      endTime,
      notes,
      numberOfPassengers,
      paymentMethod,
      price,
      specialOption,
      frequency,
      returnFrequency,
      tripLocations,
      flightNumber,
      numberOfSuitcases,
      flightNumberReturn,
      numberOfSuitcasesReturn,
      endDate,
      stopsReturn,
      // Additional fields for airport rides not explicitly listed but handled below
    } = ride;

    let rideDetails = [
      {
        label: tripLocations.length > 1 ? "תאריך התחלה" : "תאריך",
        value: formatDate(date),
      },
    ];
    if (tripLocations.length > 1) {
      rideDetails.push({
        label: "תאריך סיום",
        value: formatDate(endDate),
      });
    }

    rideDetails.push({
      label: "מספר נוסעים",
      value: numberOfPassengers.toString(),
    });
    // Handling address-based fields (origin, destination) and special cases for airport rides
    if (origin && origin.addressName) {
      rideDetails.push({ label: "מוצא", value: formatAddress(origin) });
    }
    const airport = 'נתב"ג';

    if (type.startsWith("airport")) {
      if (type === "airportArrival") {
        rideDetails.push({ label: "מוצא", value: airport });
      }
      if (type === "airportDeparture") {
        rideDetails.push({ label: "יעד", value: airport });
      }
      if (type === "airportBoth") {
        rideDetails.push({ label: "יעד", value: airport });
      }
    }
    if (stops.length > 0 && type === "airportBoth") {
      rideDetails.push({
        label: "עצירות בדרך",
        value: (
          <TouchableOpacity
            onPress={() => {
              setShowStopsModal(true);
              setStopsToDisplay(stops);
            }}
          >
            <Text>{stops.length} (לחץ לפרטים)</Text>
          </TouchableOpacity>
        ),
      });
    }
    if (type === "airportBoth") {
      if (startTime) {
        rideDetails.push({
          label: "שעת התייצבות",
          value: formatTime(startTime),
        });
      }

      if (numberOfSuitcases) {
        rideDetails.push({
          value: <MaterialIcons name="luggage" size={24} color="black" />,
          label: numberOfSuitcases,
        });
      }

      rideDetails.push({ label: "", value: "" });

      rideDetails.push({ label: "פרטי חזור", value: "" });

      rideDetails.push({ label: "תאריך חזור", value: formatDate(endDate) });

      rideDetails.push({ label: "מוצא", value: airport });
    }
    if (destination && destination.addressName) {
      rideDetails.push({ label: "יעד", value: formatAddress(destination) });
    }
    if (stops.length > 0 && type !== "airportBoth") {
      rideDetails.push({
        label: "עצירות בדרך",
        value: (
          <TouchableOpacity
            onPress={() => {
              setShowStopsModal(true);
              setStopsToDisplay(stops);
            }}
          >
            <Text>{stops.length} (לחץ לפרטים)</Text>
          </TouchableOpacity>
        ),
      });
    }
    if (stopsReturn.length > 0 && type === "airportBoth") {
      rideDetails.push({
        label: "עצירות בדרך",
        value: (
          <TouchableOpacity
            onPress={() => {
              setShowStopsModal(true);
              setStopsToDisplay(stopsReturn);
            }}
          >
            <Text>{stopsReturn.length} (לחץ לפרטים)</Text>
          </TouchableOpacity>
        ),
      });
    }
    // Handling time and frequency
    if (startTime && type != "airportBoth") {
      rideDetails.push({ label: "שעת התייצבות", value: formatTime(startTime) });
    }
    if (frequency) {
      rideDetails.push({ label: "ימי איסוף", value: frequency });
    }
    if (type === "lineRide") {
      rideDetails.push({ label: "", value: "" });
    }

    if (endTime) {
      rideDetails.push({ label: "שעת חזור", value: formatTime(endTime) });
    }
    if (returnFrequency) {
      rideDetails.push({ label: "ימי פיזור", value: returnFrequency });
    }
    if (numberOfSuitcasesReturn) {
      rideDetails.push({
        value: <MaterialIcons name="luggage" size={24} color="black" />,
        label: numberOfSuitcasesReturn,
      });
    }

    // Special options and notes
    if (specialOption && specialOption.length) {
      rideDetails.push({
        label: "דרישות מיוחדת",
        value: specialOption.join(", "),
      });
    }
    if (notes) {
      rideDetails.push({ label: "הערות", value: notes });
    }

    // Handling tripLocations for relevant ride types
    if (tripLocations && tripLocations.length > 0 && type === "tripRide") {
      tripLocations.forEach((location, index) => {
        if (location.origin != "") {
          rideDetails.push({ label: "", value: "" });

          rideDetails.push({
            label: `מסלול יום ${index + 1}`,
            value: `מ-${formatAddress(location.origin)} אל ${formatAddress(
              location.destination
            )} \nמשעה ${formatTime(location.startTime)} עד שעה ${formatTime(
              location.endTime
            )}`,
          });
          if (location.stops?.length > 0) {
            rideDetails.push({
              label: "עצירות בדרך",
              value: (
                <TouchableOpacity
                  onPress={() => {
                    setShowStopsModal(true);
                    setStopsToDisplay(location.stops);
                  }}
                >
                  <Text>{location.stops.length} (לחץ לפרטים)</Text>
                </TouchableOpacity>
              ),
            });
          }
        }
      });
    }
    rideDetails.push({ label: "", value: "" });

    rideDetails.push(
      { label: "שיטת תשלום", value: paymentMethod },
      { label: "מחיר", value: `${price}₪` }
    );
    // Render the details
    return rideDetails.map((detail, index) => (
      <Text key={index} style={styles.detailText}>
        {detail.label}
        {detail.label != "" ? ":" : ""} {detail.value}
      </Text>
    ));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.rideType}>{getRideTypeHebrewName(ride.type)}</Text>

      <View style={styles.messageContainer}>
        {renderRideDetails()}
        {renderStopsModal()}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>שלח</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  rideType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 10, // Add some space between the ride type and the details below
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#34b7f1",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalStopText: {
    fontSize: 16,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  detailTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailTextLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailTextValue: {
    fontSize: 16,
    marginLeft: 4,
  },
});

export default RidePreview;
