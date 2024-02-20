import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import {
  RideMessageType,
  getRideTypeHebrewName,
} from "../../../utils/ridesHelper";
import RideDetails from "../components/RideDetails";
import StopsModal from "../components/StopsModal";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthContext";
import { useRidesContext } from "../../../providers/RidesContext";
import { useChatsContext } from "../../../providers/ChatsProvider";

const RideMessage = ({ ride }) => {
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const { cancelRide, askForRide } = useRidesContext();
  const { cancelRideOnChats } = useChatsContext();
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleSend = async (messageType, suggestionPrice) => {
    console.log("Send button clicked");
    await askForRide(ride, messageType, suggestionPrice);
  };

  const handleSuggestPrice = () => {
    console.log("Suggest price button clicked");
    setShowPriceSuggestionModal(true);
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

      {ride.canceled ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>בוטלה</Text>
        </TouchableOpacity>
      ) : user.uid === ride.rideOwner ? (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>בטל</Text>
        </TouchableOpacity>
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSend(RideMessageType.CONTRACTOR_SEND)}
            >
              <Text style={styles.buttonText}>שלח</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() =>
                handleSend(RideMessageType.CONTRACTOR_SEND_DETAILS)
              }
            >
              <Text style={styles.buttonText}>שלח פרטים</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSuggestPrice}
            >
              <Text style={styles.buttonText}>הצע מחיר</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
            <Text style={styles.modalText}>מחיר נוכחי: {ride.price}</Text>
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
