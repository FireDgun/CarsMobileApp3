import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import WaitingForResponse from "./WaitingForResponse";
import RideActionButtons from "../../shareRide/share/RideActionButtons";
import {
  RideMessageType,
  getRideMessageTextByType,
} from "../../../utils/ridesHelper";

//need to finish this component
const NegotiationButtons = ({
  messages,
  senderId,
  ride,
  setEnableSendButton,
}) => {
  const type = messages[messages.length - 1].type;
  const { sendMessageInNegotiation } = useRidesContext();
  const { user } = useAuth();
  console.log(ride);
  const handlePublisherApprove = async () => {
    await sendMessageInNegotiation(ride.id, senderId, {
      text: getRideMessageTextByType(RideMessageType.PUBLISHER_APPROVED),
      type: RideMessageType.PUBLISHER_APPROVED,
      createdAt: new Date(),
    });
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttonAccept}
          onPress={handlePublisherApprove}
        >
          <Text style={styles.buttonText}>קבל את ההצעה</Text>
          <Text style={styles.buttonText}>שלח לאישור סופי</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReject}>
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
});
export default NegotiationButtons;
