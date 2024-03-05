import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const CancelRideModal = ({ modalVisible, setModalVisible, onConfirm }) => {
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setModalVisible(false);
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            האם אתה בטוח שברצונך לבטל את הנסיעה?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.button, styles.buttonCancel]}
            >
              <Text style={styles.textStyle}>לא</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirm}
              style={[styles.button, styles.buttonConfirm]}
            >
              <Text style={styles.textStyle}>כן</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#2196F3",
  },
  buttonConfirm: {
    backgroundColor: "#f44336",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CancelRideModal;
