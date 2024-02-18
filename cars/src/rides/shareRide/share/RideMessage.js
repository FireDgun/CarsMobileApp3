import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { getRideTypeHebrewName } from "../../../utils/ridesHelper";
import RideDetails from "../components/RideDetails";
import StopsModal from "../components/StopsModal";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthContext";
import { useRidesContext } from "../../../providers/RidesContext";
import { useChatsContext } from "../../../providers/ChatsProvider";

const RideMessage = ({ ride }) => {
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);
  const { cancelRide } = useRidesContext();
  const { cancelRideOnChats } = useChatsContext();
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleSend = () => {
    console.log("Send button clicked");
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    cancelRide(ride.id);
    cancelRideOnChats(ride.id);
  };

  return (
    <View style={[styles.card, ride.canceled && styles.canceledCard]}>
      <Text style={styles.rideType}>{getRideTypeHebrewName(ride.type)}</Text>

      <View style={styles.messageContainer}>
        <RideDetails
          ride={ride}
          setShowStopsModal={setShowStopsModal}
          setStopsToDisplay={setStopsToDisplay}
        />
        <StopsModal
          setShowStopsModal={setShowStopsModal}
          showStopsModal={showStopsModal}
          stopsToDisplay={stopsToDisplay}
        />
      </View>

      {user.uid === ride.rideOwner ? (
        <TouchableOpacity
          style={
            ride.canceled ? styles.cancelButtonDisabled : styles.cancelButton
          }
          onPress={handleCancel}
          disabled
        >
          <Text style={styles.disabledButtonText}>בוטלה </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>שלח</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
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
  canceledCard: {
    backgroundColor: "#D3D3D3",
  },
  rideType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: "flex-start",
  },
  sendButton: {
    backgroundColor: "#34b7f1",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ff0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButtonText: {
    color: "#888",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButtonDisabled: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default RideMessage;
