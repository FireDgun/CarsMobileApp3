import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRidesContext } from "../../../providers/RidesContext";
import { useChatsContext } from "../../../providers/ChatsProvider";
import { buildRideRowView, flashRide } from "../../../utils/ridesHelper";
import StopsModal from "../../shareRide/components/StopsModal";
import NegotiationRow from "./NegotiationRow";
import { useAuth } from "../../../providers/AuthContext";
import MenageRideButtons from "./MenageRideButtons";
import MenageRidePayment from "./MenageRidePayment";
import CancelRideModal from "../../shareRide/share/CancelRideModal";

const RideRow = ({
  ride,
  setScrollEnabled,
  optionalNegotiationId = "",
  tab,
}) => {
  const [expanded, setExpanded] = useState(false); // State to manage the expanded/collapsed state
  const navigation = useNavigation();
  const { cancelRide } = useRidesContext();
  const { cancelRideOnChats } = useChatsContext();
  const [showStopsModal, setShowStopsModal] = useState(false);
  const [stopsToDisplay, setStopsToDisplay] = useState([]);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const { user } = useAuth();
  const { mainDetails, secondaryDetails } = buildRideRowView(
    ride,
    setShowStopsModal,
    setStopsToDisplay,
    tab == "Close"
  ); // Extract details using the utility function

  const onSharePress = () => {
    navigation.navigate("ShareRidePage", { rideId: ride.id });
  };

  const onCancelPress = () => {
    setIsCancelModalVisible(true);
  };
  const handleConfirmCancelRide = () => {
    console.log("Cancel button clicked");
    cancelRide(ride.id);
    cancelRideOnChats(ride.id);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded); // Toggle the expanded state
  };
  return (
    <View>
      <TouchableOpacity style={styles.rideRow} onPress={toggleExpanded}>
        <View style={styles.rideInfo}>
          {/* Displaying main details */}
          {mainDetails.map((detail, index) => (
            <Text key={index} style={styles.rideText}>
              {detail}
            </Text>
          ))}
          {/* Conditionally displaying secondary details */}
          {expanded &&
            secondaryDetails.map((detail, index) => {
              if (detail.label) {
                return (
                  <View
                    key={`secondary-${index}`}
                    style={{ flexDirection: "row" }}
                  >
                    <Text style={styles.rideText}>{detail.label} </Text>
                    {detail.value}
                  </View>
                );
              } else {
                return (
                  <Text key={`secondary-${index}`} style={styles.rideText}>
                    {detail}
                  </Text>
                );
              }
            })}
        </View>
        <StopsModal
          setShowStopsModal={setShowStopsModal}
          showStopsModal={showStopsModal}
          stopsToDisplay={stopsToDisplay}
          fullDetails={tab == "Close" ? true : false}
        />
        {tab == "Open" && ride.rideOwner == user.uid && (
          <>
            <TouchableOpacity style={styles.shareButton} onPress={onSharePress}>
              <Text style={styles.shareButtonText}>שתף</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancelPress}
            >
              <Text style={styles.cancelButtonText}>בטל</Text>
            </TouchableOpacity>
            <CancelRideModal
              modalVisible={isCancelModalVisible}
              setModalVisible={setIsCancelModalVisible}
              onConfirm={handleConfirmCancelRide}
            />
          </>
        )}
        {tab == "Close" && <MenageRideButtons ride={ride} />}
        {tab == "History" && ride.rideBuyer && (
          <MenageRidePayment ride={ride} />
        )}

        {ride.canceled && <Text style={styles.canceledText}>בוטל</Text>}
        <MaterialIcons name="expand-more" size={24} color="gray" />
      </TouchableOpacity>
      {ride.rideOwner == user.uid ? (
        flashRide(ride).negotiations.map((negotiation, index) => {
          return (
            <NegotiationRow
              key={negotiation.senderId}
              senderId={negotiation.senderId}
              senderName={negotiation.senderName}
              senderImg={negotiation.senderImg}
              messages={negotiation.messages}
              ride={ride}
              setScrollEnabled={setScrollEnabled}
              initialExpand={
                optionalNegotiationId == negotiation.senderId ? true : false
              }
              tab={tab}
            />
          );
        })
      ) : (
        <NegotiationRow
          senderName={ride.rideOwnerName}
          senderImg={ride.rideOwnerImage}
          senderId={user.uid}
          messages={ride?.[user.uid]?.messages}
          ride={ride}
          setScrollEnabled={setScrollEnabled}
          initialExpand={optionalNegotiationId == user.uid ? true : false}
          tab={tab}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    backgroundColor: "#FFF",
  },
  rideInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  rideText: {
    fontSize: 16,
    color: "#444",
  },
  shareButton: {
    marginRight: 10, // Add some margin to separate it from the text
    backgroundColor: "#007BFF", // A blue color for the button
    padding: 5,
    borderRadius: 5,
  },
  shareButtonText: {
    color: "#FFF", // White color for the button text
    fontSize: 14,
  },
  cancelButton: {
    marginRight: 10, // Add some margin to separate it from the text
    backgroundColor: "#FF0000", // A red color for the button
    padding: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#FFF", // White color for the button text
    fontSize: 14,
  },
  canceledText: {
    color: "#FF0000",
    fontSize: 16,
  },
});

export default RideRow;
