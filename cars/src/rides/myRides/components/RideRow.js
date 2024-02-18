import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { formatAddress, formatDate } from "../../../utils/ridesHelper";
import { useNavigation } from "@react-navigation/native";
import { useRidesContext } from "../../../providers/RidesContext";
import { useChatsContext } from "../../../providers/ChatsProvider";

const RideRow = ({ ride }) => {
  const navigation = useNavigation();
  const { cancelRide } = useRidesContext();
  const { cancelRideOnChats } = useChatsContext();
  const onSharePress = () => {
    // Navigate to the ShareRidePage and pass ride.id as a parameter
    navigation.navigate("ShareRidePage", { rideId: ride.id });
  };

  const onCancelPress = () => {
    cancelRide(ride.id);
    cancelRideOnChats(ride.id);
  };

  return (
    <View style={styles.rideRow}>
      <View style={styles.rideInfo}>
        <Text style={styles.rideText}>{formatDate(ride.date)}</Text>
        <Text style={styles.rideText}>מוצא: {formatAddress(ride.origin)}</Text>
        <Text style={styles.rideText}>
          יעד: {formatAddress(ride.destination)}
        </Text>
        <Text style={styles.rideText}>מחיר: {ride.price}₪</Text>
      </View>
      {ride.canceled && <Text style={styles.canceledText}>בוטל</Text>}
      {!ride.canceled && (
        <>
          <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
            <Text style={styles.shareButtonText}>שתף</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
            <Text style={styles.cancelButtonText}>בטל</Text>
          </TouchableOpacity>
        </>
      )}
      <MaterialIcons name="chevron-right" size={24} color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  rideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    backgroundColor: "#FFF",
  },
  rideInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  rideText: {
    fontSize: 16,
    color: "#444",
  },
  shareButton: {
    marginRight: 10, // Add some margin to separate it from the text
    backgroundColor: "#007BFF", // A blue color for the button
    padding: 5,
    borderRadius: 5,
  },
  shareButtonText: {
    color: "#FFF", // White color for the button text
    fontSize: 14,
  },
  cancelButton: {
    marginRight: 10, // Add some margin to separate it from the text
    backgroundColor: "#FF0000", // A red color for the button
    padding: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#FFF", // White color for the button text
    fontSize: 14,
  },
  canceledText: {
    color: "#FF0000",
    fontSize: 16,
  },
});

export default RideRow;
