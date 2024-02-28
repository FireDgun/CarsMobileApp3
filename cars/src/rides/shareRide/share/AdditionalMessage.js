import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { RideMessageType } from "../../../utils/ridesHelper";

const AdditionalMessage = ({
  showAdditionalMessageModal,
  setShowAdditionalMessageModal,
  handleSend,
  title,
  question,
  IsConstructor = true,
}) => {
  const [additionalMessageText, setAdditionalMessageText] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAdditionalMessageModal}
      onRequestClose={() => {
        setShowAdditionalMessageModal((prev) => !prev);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>
          {question && (
            <Text style={styles.modalText}>השאלה היתה: {question}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder={question ? "תגובה לשאלה" : "מה השאלה?"}
            onChangeText={(text) => setAdditionalMessageText(text)}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                handleSend(
                  IsConstructor
                    ? RideMessageType.CONTRACTOR_ADDITIONAL_QUESTION
                    : RideMessageType.PUBLISHER_RESPONSE_QUESTION,
                  additionalMessageText
                );
                setShowAdditionalMessageModal(false);
              }}
            >
              <Text style={styles.buttonText}>שלח</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowAdditionalMessageModal(false)}
            >
              <Text style={styles.buttonText}>ביטול</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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
});

export default AdditionalMessage;
