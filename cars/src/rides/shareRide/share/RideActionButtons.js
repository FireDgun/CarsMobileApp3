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
import SuggestPriceForRide from "./SuggestPriceForRide";

const RideActionButtons = ({ ride }) => {
  const [showPriceSuggestionModal, setShowPriceSuggestionModal] =
    useState(false);
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
    const updatedRide = await askForRide(ride, messageType, suggestionPrice);
    setRideDetails(updatedRide);
    navigation.navigate("Dashboard", {
      initialPage: "rides",
      initialSelectedTab: "MyBuyRides",
      initialTab: "Open",
      optionalNegotiationId: user.uid,
      optionalNegotiationRideId: ride.id,
    });
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
      ) : ride.rideBuyer && ride.rideBuyer == user.uid ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>נסגרה איתך!</Text>
        </TouchableOpacity>
      ) : ride.rideBuyer ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>נסגרה</Text>
        </TouchableOpacity>
      ) : new Date(rideDetails.date) < new Date().setHours(0, 0, 0, 0) ? (
        <TouchableOpacity style={styles.cancelButtonDisabled} disabled>
          <Text style={styles.disabledButtonText}>הנסיעה עברה</Text>
        </TouchableOpacity>
      ) : user.uid === ride.rideOwner ? (
        <>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>בטל</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() =>
              navigation.navigate("Dashboard", {
                initialPage: "rides",
                initialSelectedTab: "MySellRides",
                initialTab: "Open",
              })
            }
          >
            <Text style={styles.buttonText}>צפה במשא ומתן</Text>
          </TouchableOpacity>
        </>
      ) : rideDetails[user.uid] ? (
        <>
          <Text style={styles.disabledButtonText}>בקשה נשלחה</Text>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() =>
              navigation.navigate("Dashboard", {
                initialPage: "rides",
                initialSelectedTab: "MyBuyRides",
                initialTab: "Open",
                optionalNegotiationId: user.uid,
                optionalNegotiationRideId: ride.id,
              })
            }
          >
            <Text style={styles.buttonText}>צפה במשא ומתן</Text>
          </TouchableOpacity>
        </>
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
      <SuggestPriceForRide
        showPriceSuggestionModal={showPriceSuggestionModal}
        setShowPriceSuggestionModal={setShowPriceSuggestionModal}
        handleSend={handleSend}
        currentPrice={ride.price}
        IsConstructor={true}
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

export default RideActionButtons;
