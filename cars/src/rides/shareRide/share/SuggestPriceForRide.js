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

const SuggestPriceForRide = ({
  showPriceSuggestionModal,
  setShowPriceSuggestionModal,
  handleSend,
  currentPrice,
}) => {
  const [suggestedPrice, setSuggestedPrice] = useState("");

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPriceSuggestionModal}
      onRequestClose={() => {
        setShowPriceSuggestionModal((prev) => !prev);
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>הצע מחיר</Text>
          <Text style={styles.modalText}>מחיר נוכחי: {currentPrice}</Text>
          <TextInput
            style={styles.input}
            placeholder="מה המחיר שאתה מציע?"
            onChangeText={(text) => setSuggestedPrice(text)}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                handleSend(
                  RideMessageType.CONTRACTOR_OFFER_PRICE,
                  suggestedPrice
                );
                setShowPriceSuggestionModal(false);
              }}
            >
              <Text style={styles.buttonText}>שלח</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowPriceSuggestionModal(false)}
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

export default SuggestPriceForRide;
