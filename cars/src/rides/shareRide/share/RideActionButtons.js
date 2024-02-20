import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { RideMessageType } from "../../../utils/ridesHelper";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthContext";
import { useRidesContext } from "../../../providers/RidesContext";
import { useChatsContext } from "../../../providers/ChatsProvider";
import WaitingForResponse from "../../myRides/components/WaitingForResponse";

const RideActionButtons = ({ ride, setEnableSendButton }) => {
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
  const [suggestedPrice, setSuggestedPrice] = useState("");
  const { cancelRide, askForRide, allRides } = useRidesContext();
  const { cancelRideOnChats } = useChatsContext();
  const { user } = useAuth();
  const [rideDetails, setRideDetails] = useState(ride);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Rest of the code...

  useEffect(() => {
    if (allRides) {
      setRideDetails(
        allRides.find(
          (r) => r.id === ride.id && r.interestedUsers.includes(user.uid)
        ) || ride
      );
      setIsReady(true);
    }
  }, [allRides]);
  const navigation = useNavigation();
  const handleSend = async (messageType, suggestionPrice) => {
    console.log("Send button clicked");
    setEnableSendButton(false);
    const updatedRide = await askForRide(ride, messageType, suggestionPrice);
    setRideDetails(updatedRide);
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
  if (!isReady) {
    return <WaitingForResponse isLoading={true} />;
  }

  return (
    <View>
      {ride.canceled ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>בוטלה</Text>
        </TouchableOpacity>
      ) : ride.rideBuyer ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>נסגרה</Text>
        </TouchableOpacity>
      ) : user.uid === ride.rideOwner ? (
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>בטל</Text>
        </TouchableOpacity>
      ) : rideDetails[user.uid] ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>בקשה נשלחה</Text>
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
  rideType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
    marginBottom: 10,
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

export default RideActionButtons;
