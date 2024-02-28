import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import SuggestPriceForRide from "../../shareRide/share/SuggestPriceForRide";
import {
  RideMessageType,
  getRideMessageTextByType,
} from "../../../utils/ridesHelper";
import { useMyModal } from "../../../providers/ModalProvider";
import AdditionalMessage from "../../shareRide/share/AdditionalMessage";

const RideConstructorActionButtonsNegotiation = ({
  ride,
  currentPrice,
  isRideDetailsSent = false,
}) => {
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
  const [showAdditionalMessageModal, setShowAdditionalMessageModal] =
    useState(false);
  const { sendMessageInNegotiation, allRides } = useRidesContext();
  const { user } = useAuth();
  const { showModal, hideModal } = useMyModal();

  const [rideDetails, setRideDetails] = useState(ride);
  useEffect(() => {
    if (allRides) {
      setRideDetails(
        allRides.find(
          (r) => r.id === ride.id && r.interestedUsers.includes(user.uid)
        ) || ride
      );
    }
  }, [allRides]);
  const navigation = useNavigation();

  const handleSend = async (messageType, suggestionPrice) => {
    console.log("send or Suggest price from constructor", messageType);
    await sendMessageInNegotiation(ride.id, user.uid, {
      text: getRideMessageTextByType(messageType, suggestionPrice),
      type: messageType,
      createdAt: new Date(),
    });
    setShowPriceSuggestionModal(false);
  };

  const handleSuggestPrice = () => {
    console.log("Suggest price button clicked");
    setShowPriceSuggestionModal(true);
  };

  const handleAdditionalQuestion = () => {
    setShowAdditionalMessageModal(true);
  };
  const handleSendAdditionalQuestion = (messageType, question) => {
    console.log("send additional question", messageType);
    sendMessageInNegotiation(ride.id, user.uid, {
      text: getRideMessageTextByType(messageType, "", question),
      type: messageType,
      createdAt: new Date(),
    });
    setShowAdditionalMessageModal(false);
  };

  return (
    <View>
      {ride.canceled ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>בוטלה</Text>
        </TouchableOpacity>
      ) : ride.rideBuyer == user.uid ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>נסגרה איתי</Text>
        </TouchableOpacity>
      ) : ride.rideBuyer ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>נסגרה עם מישהו אחר</Text>
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
            {isRideDetailsSent ? (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleAdditionalQuestion}
              >
                <Text style={styles.buttonText}>שאלה נוספת</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.sendButton}
                onPress={() =>
                  handleSend(RideMessageType.CONTRACTOR_SEND_DETAILS)
                }
              >
                <Text style={styles.buttonText}>שלח פרטים</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSuggestPrice}
            >
              <Text style={styles.buttonText}>הצע מחיר</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <SuggestPriceForRide
        showPriceSuggestionModal={showPriceSuggestionModal}
        setShowPriceSuggestionModal={setShowPriceSuggestionModal}
        handleSend={handleSend}
        currentPrice={currentPrice ?? ride.price}
        IsConstructor={true}
      />
      <AdditionalMessage
        setShowAdditionalMessageModal={setShowAdditionalMessageModal}
        showAdditionalMessageModal={showAdditionalMessageModal}
        handleSend={handleSendAdditionalQuestion}
        title={"שאלה נוספת"}
      />
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

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default RideConstructorActionButtonsNegotiation;
