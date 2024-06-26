import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import WaitingForResponse from "./WaitingForResponse";
import RideActionButtons from "../../shareRide/share/RideActionButtons";
import {
  RideMessageType,
  extractLastPriceFromMessagesArray,
  extractPriceFromMessage,
  getRideMessageTextByType,
} from "../../../utils/ridesHelper";
import AdditionDetailsModal from "./AdditionDetailsModal";
import GooglePlacesInput from "../../../components/GooglePlacesInput";
import { useMyModal } from "../../../providers/ModalProvider";
import SuggestPriceForRide from "../../shareRide/share/SuggestPriceForRide";
import RideConstructorActionButtonsNegotiation from "./RideConstructorActionButtonsNegotiation";
import AdditionalMessage from "../../shareRide/share/AdditionalMessage";
import Timer from "./Timer";
import { getRealTimeLeft, getTimeLeft } from "../../../utils/datesHelper";

//need to finish this component
const NegotiationButtons = ({ messages, senderId, ride }) => {
  const type = messages[messages.length - 1].type;
  const messageText = messages[messages.length - 1].text;
  const messageCreatedAt = messages[messages.length - 1].createdAt;
  const { sendMessageInNegotiation } = useRidesContext();
  const { user } = useAuth();
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
  const [showAdditionalMessageModal, setShowAdditionalMessageModal] =
    useState(false);
  const { showModal, hideModal } = useMyModal();

  useEffect(() => {
    let intervalId = null;

    if (type === RideMessageType.PUBLISHER_APPROVED) {
      intervalId = setInterval(() => {
        const timeLeft = getRealTimeLeft(messageCreatedAt);
        if (timeLeft < -10) {
          handleTimesUp();
          clearInterval(intervalId); // Stop the interval once condition is met
        }
      }, 1000); // Check every second
    }

    // Clean up the interval on component unmount or when messages change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [messages]);

  const handleTimesUp = useCallback(() => {
    sendMessageInNegotiation(ride.id, senderId, {
      type: RideMessageType.PUBLISHER_TIMEOUT,
      text: getRideMessageTextByType(RideMessageType.PUBLISHER_TIMEOUT),
      createdAt: new Date(),
    });
  }, [ride]);
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
    setShowPriceSuggestionModal(false);
  };
  const handleAdditionalQuestion = () => {
    setShowAdditionalMessageModal(true);
  };
  const handleSendResponseToAdditionalQuestion = (messageType, question) => {
    console.log("send additional question", messageType);
    sendMessageInNegotiation(ride.id, senderId, {
      text: getRideMessageTextByType(messageType, "", question),
      type: messageType,
      createdAt: new Date(),
    });
    setShowAdditionalMessageModal(false);
  };
  if (type == RideMessageType.CONTRACTOR_FINALIZE) {
    return <Text>סגרתם את הנסיעה</Text>;
  }
  if (user.uid === senderId && type != RideMessageType.CONTRACTOR_REJECT) {
    if (type.includes("Contractor")) {
      return <WaitingForResponse isLoading={true} />;
    }

    //this we wont check here
    //we will make context that will always check if there is ride that Im interested in
    //and if I got publisher approved message
    //then I will show pop up all over the app

    //this situation - no buttons
    if (type == RideMessageType.PUBLISHER_REJECT) {
      return null;
    }
    if (type == RideMessageType.PUBLISHER_OFFER_PRICE) {
      return (
        <RideConstructorActionButtonsNegotiation
          ride={ride}
          currentPrice={extractPriceFromMessage(messageText)}
          isRideDetailsSent={
            !!messages.find(
              (m) => m.type == RideMessageType.PUBLISHER_SEND_DETAILS
            )
          }
        />
      );
    }
    if (
      type == RideMessageType.PUBLISHER_SEND_DETAILS ||
      type == RideMessageType.PUBLISHER_RESPONSE_QUESTION ||
      (type == RideMessageType.PUBLISHER_TIMEOUT && ride.rideBuyer == null)
    ) {
      return (
        <RideConstructorActionButtonsNegotiation
          ride={ride}
          currentPrice={extractLastPriceFromMessagesArray(
            messages.map((m) => m.text),
            ride.price
          )}
          isRideDetailsSent={true}
        />
      );
    }
  } else {
    if (
      type.includes("Publisher") &&
      type != RideMessageType.PUBLISHER_APPROVED &&
      type != RideMessageType.PUBLISHER_REJECT &&
      type != RideMessageType.PUBLISHER_TIMEOUT
    ) {
      return <WaitingForResponse isLoading={true} />;
    }
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
          {type == RideMessageType.CONTRACTOR_OFFER_PRICE && (
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
  if (type == RideMessageType.CONTRACTOR_ADDITIONAL_QUESTION) {
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonSuggestPrice}
            onPress={handleAdditionalQuestion}
          >
            <Text style={styles.buttonText}>שלח תגובה לשאלה</Text>
          </TouchableOpacity>
        </View>
        <AdditionalMessage
          setShowAdditionalMessageModal={setShowAdditionalMessageModal}
          showAdditionalMessageModal={showAdditionalMessageModal}
          handleSend={handleSendResponseToAdditionalQuestion}
          title={"תגובה"}
          question={messageText.replace("שאלה נוספת \n", "")}
          IsConstructor={false}
        />
      </View>
    );
  }
  if (type == RideMessageType.PUBLISHER_APPROVED) {
    return (
      <Timer
        startTimer={getTimeLeft(messageCreatedAt)}
        executeWhenFinish={() => {}}
        stopInTheMiddle={false}
      />
      // null
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
