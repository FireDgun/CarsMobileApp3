import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import useMyRides from "../hooks/useMyRides";
import {
  RideMessageType,
  getRideMessageTextByType,
} from "../utils/ridesHelper";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState,
} from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useChatsContext } from "./ChatsProvider";
import Timer from "../rides/myRides/components/Timer";
import { getTimeLeft } from "../utils/datesHelper";
const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#fff",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export const RidesContext = createContext();

export const RidesProvider = ({ children }) => {
  const {
    allRides,
    applyListenersToAllMyRides,
    postNewRide,
    cleanupListeners,
    cancelRide,
    askForRide,
    sendMessageInNegotiation,
    updateRide,
  } = useMyRides();
  const { closeRideWithMeOnChats } = useChatsContext();
  const { user } = useAuth();
  const [openNegotiationRides, setOpenNegotiationRides] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [approvedRide, setApprovedRide] = useState({});
  const [stopTimerInMiddle, setStopTimerInMiddle] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const handleTimesUp = useCallback(() => {
    sendMessageInNegotiation(approvedRide.id, user.uid, {
      type: RideMessageType.PUBLISHER_TIMEOUT,
      text: getRideMessageTextByType(RideMessageType.PUBLISHER_TIMEOUT),
      createdAt: new Date(),
    });
  }, [approvedRide, user]);
  const handleApprovedRide = async () => {
    try {
      setStopTimerInMiddle(true); // Stop the timer in the middle (optional, depending on the requirements of the app)
      // Run both async tasks in parallel and wait for them to complete
      await updateRide(approvedRide.id, {
        ...approvedRide,
        rideBuyer: user.uid,
        [user.uid]: {
          ...approvedRide[user.uid],
          messages: [
            ...approvedRide[user.uid].messages,
            {
              text: getRideMessageTextByType(
                RideMessageType.CONTRACTOR_FINALIZE
              ),
              type: RideMessageType.CONTRACTOR_FINALIZE,
              createdAt: new Date(),
            },
          ],
        },
      });
      closeRideWithMeOnChats(approvedRide.id);
      setIsModalVisible(false);
    } catch (error) {
      // Handle any errors that occur during the execution of either promise
      console.error("Error handling approved ride:", error);
      // Optionally, update UI or state to reflect the error
    }
  };

  const handleRejectRide = () => {
    setStopTimerInMiddle(true); // Stop the timer in the middle (optional, depending on the requirements of the app)
    sendMessageInNegotiation(approvedRide.id, user.uid, {
      type: RideMessageType.CONTRACTOR_REJECT,
      text: getRideMessageTextByType(RideMessageType.CONTRACTOR_REJECT),
      createdAt: new Date(),
    });
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Apply listeners only if there is a user logged in
    if (user) {
      applyListenersToAllMyRides();
    }

    // Cleanup function to remove all listeners when the component unmounts or dependencies change
    return () => {
      cleanupListeners();
    };
  }, [user]); // Depend on cleanupListeners and applyListenersToAllMyRides as well

  useEffect(() => {
    if (allRides && user?.uid) {
      setOpenNegotiationRides(
        allRides.filter(
          (ride) =>
            ride.rideBuyer == null && ride.interestedUsers?.includes(user.uid)
        )
      );
    }
  }, [allRides]);
  useEffect(() => {
    if (user) {
      const hasApprovedMessage = openNegotiationRides.find(
        (ride) =>
          ride[user.uid]?.messages?.length > 0 &&
          ride[user.uid].messages[ride[user.uid].messages.length - 1].type ===
            RideMessageType.PUBLISHER_APPROVED // Assuming "RideMessageTypes.PUBLISHER_APPROVED" is a valid type
      );

      const lastApprovedMessageCreatedAt =
        hasApprovedMessage?.[user.uid]?.messages?.[
          hasApprovedMessage[user.uid].messages.length - 1
        ]?.createdAt;

      if (hasApprovedMessage) {
        setApprovedRide(hasApprovedMessage);
        setTimeLeft(getTimeLeft(lastApprovedMessageCreatedAt));
        setIsModalVisible(true); // Show the modal if condition is met
      } else {
        setIsModalVisible(false);
      }
    }
  }, [openNegotiationRides, user?.uid]);

  return (
    <RidesContext.Provider
      value={{
        allRides,
        postNewRide,
        cancelRide,
        askForRide,
        sendMessageInNegotiation,
        updateRide,
      }}
    >
      {children}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {}}
      >
        <View style={styles.modalView}>
          {timeLeft == 0 ? (
            <Text style={styles.modalText}>נגמר הזמן, ההצעה נסגרה</Text>
          ) : (
            <Text style={styles.modalText}>
              {approvedRide.rideOwnerName} אישר את ההצעה שלך
            </Text>
          )}
          {timeLeft > 0 && (
            <View>
              <TouchableOpacity
                onPress={handleApprovedRide}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>אישור סופי</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRejectRide}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>בסוף לא מתאים לי</Text>
              </TouchableOpacity>
            </View>
          )}
          <Timer
            startTimer={timeLeft}
            executeWhenFinish={handleTimesUp}
            stopInTheMiddle={stopTimerInMiddle}
          />
        </View>
      </Modal>
    </RidesContext.Provider>
  );
};

export const useRidesContext = () => {
  const context = useContext(RidesContext);
  if (!context) {
    throw new Error("useRidesContext must be used within a RidesProvider");
  }
  return context;
};
