import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const StopsModal = ({ stopsToDisplay, showStopsModal, setShowStopsModal }) => {
  return (
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
};

const styles = StyleSheet.create({
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

export default StopsModal;
