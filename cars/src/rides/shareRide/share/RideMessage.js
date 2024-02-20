import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { getRideTypeHebrewName } from "../../../utils/ridesHelper";
import RideDetails from "../components/RideDetails";
import StopsModal from "../components/StopsModal";

import RideActionButtons from "./RideActionButtons";

const RideMessage = ({ ride }) => {
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);
  const [enableSendButton, setEnableSendButton] = useState(true);

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
      <RideActionButtons
        ride={ride}
        setEnableSendButton={setEnableSendButton}
      />
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  modalButtonContainer: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#34b7f1",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default RideMessage;
