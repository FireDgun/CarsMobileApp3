import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import WaitingForResponse from "./WaitingForResponse";
import RideActionButtons from "../../shareRide/share/RideActionButtons";
import {
  RideMessageType,
  extractPriceFromMessage,
  getRideMessageTextByType,
} from "../../../utils/ridesHelper";
import AdditionDetailsModal from "./AdditionDetailsModal";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import { useMyModal } from "../../../providers/ModalProvider";
import SuggestPriceForRide from "../../shareRide/share/SuggestPriceForRide";

//need to finish this component
const NegotiationButtons = ({
  messages,
  senderId,
  ride,
  setEnableSendButton,
}) => {
  const type = messages[messages.length - 1].type;
  const messageText = messages[messages.length - 1].text;
  const { sendMessageInNegotiation } = useRidesContext();
  const { user } = useAuth();
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
  const { showModal, hideModal } = useMyModal();

  const handlePublisherApprove = async () => {
    console.log("publisher approve");
    await sendMessageInNegotiation(ride.id, senderId, {
      text: getRideMessageTextByType(RideMessageType.PUBLISHER_APPROVED),
      type: RideMessageType.PUBLISHER_APPROVED,
      createdAt: new Date(),
    });
  };

  const handlePublisherReject = async () => {
    console.log("publisher reject");
    await sendMessageInNegotiation(ride.id, senderId, {
      text: getRideMessageTextByType(RideMessageType.PUBLISHER_REJECT),
      type: RideMessageType.PUBLISHER_REJECT,
      createdAt: new Date(),
    });
  };

  const handlePublisherSendDetails = () => {
    showModal(
      <AdditionDetailsModal
        handleCloseModal={hideModal}
        ride={ride}
        senderId={senderId}
      />
    );
  };
  const handlePublisherOpenModalSuggestPrice = () => {
    console.log("Suggest price button clicked");
    setShowPriceSuggestionModal(true);
  };

  const handlePublisherSuggestPrice = async (messageType, suggestionPrice) => {
    console.log("send Suggest price from publisher");
    await sendMessageInNegotiation(ride.id, senderId, {
      text: getRideMessageTextByType(messageType, suggestionPrice),
      type: messageType,
      createdAt: new Date(),
    });
    setShowPriceSuggestionModal(true);
  };

  if (user.uid === senderId) {
    if (type.includes("Contractor")) {
      return <WaitingForResponse isLoading={true} />;
    }

    return (
      <View>
        <RideActionButtons
          ride={ride}
          setEnableSendButton={setEnableSendButton}
        />
      </View>
    );
  }

  if (
    type == RideMessageType.CONTRACTOR_OFFER_PRICE ||
    type == RideMessageType.CONTRACTOR_SEND
  ) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonAccept}
            onPress={handlePublisherApprove}
          >
            <Text style={styles.buttonText}>קבל את ההצעה</Text>
            <Text style={styles.buttonText}>שלח לאישור סופי</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReject}
            onPress={handlePublisherReject}
          >
            <Text style={styles.buttonText}>דחה את ההצעה</Text>
          </TouchableOpacity>
          {RideMessageType.CONTRACTOR_OFFER_PRICE && (
            <TouchableOpacity
              style={styles.buttonSuggestPrice}
              onPress={handlePublisherOpenModalSuggestPrice}
            >
              <Text style={styles.buttonText}>הצע מחיר אחר</Text>
            </TouchableOpacity>
          )}
        </View>
        <SuggestPriceForRide
          showPriceSuggestionModal={showPriceSuggestionModal}
          setShowPriceSuggestionModal={setShowPriceSuggestionModal}
          handleSend={handlePublisherSuggestPrice}
          currentPrice={extractPriceFromMessage(messageText)}
          IsConstructor={false}
        />
      </View>
    );
  }
  if (type == RideMessageType.CONTRACTOR_SEND_DETAILS) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={handlePublisherSendDetails}
        >
          <Text style={styles.buttonText}>שלח פרטים נוספים</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReject} onPress={() => {}}>
          <Text style={styles.buttonText}>דחה את ההצעה</Text>
        </TouchableOpacity>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonAccept: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  buttonReject: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  buttonSuggestPrice: {
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
  },
});
export default NegotiationButtons;
