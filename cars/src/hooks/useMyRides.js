import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../providers/AuthContext";
import { useCallback, useState } from "react";
import {
  RideMessageType,
  getRideMessageTextByType,
} from "../utils/ridesHelper";

const useMyRides = () => {
  const { user } = useAuth();
  const [allRides, setAllRides] = useState([]);
  const [unsubscribers, setUnsubscribers] = useState([]);

  const cancelRide = async (rideId) => {
    try {
      // Mark ride.cancelled as true
      await firestore().collection("rides").doc(rideId).update({
        canceled: true,
      });
    } catch (error) {
      console.error("Error cancelling ride:", error);
    }
  };

  const postNewRide = async (ride, rideOwner) => {
    try {
      // Add the ride to the 'rides' collection with an additional 'rideOwner' field
      const docRef = await firestore()
        .collection("rides")
        .add({
          ...ride,
          rideOwner: rideOwner || user.uid, // Add the user's UID as the 'rideOwner' field
        });

      // Fetch the newly added ride's ID
      const newRideId = docRef.id;

      // Create a new ride object that includes the Firestore document ID
      const newRideWithId = { ...ride, id: newRideId, rideOwner: user.uid };

      // Update the allRides state to include the new ride
      setAllRides((prevRides) => [...prevRides, newRideWithId]);
      applyListenersToAllMyRides(newRideId);
      console.log("Ride posted successfully!");
    } catch (error) {
      console.error("Error posting ride:", error);
    }
  };

  const fetchMyRides = async () => {
    if (!user?.uid) return []; // Ensure user UID is available
    // Query to find rides where the current user is the rideOwner
    const ownerQuerySnapshot = await firestore()
      .collection("rides")
      .where("rideOwner", "==", user.uid)
      .get();

    // Query to find rides where the current user is the rideBuyer
    const buyerQuerySnapshot = await firestore()
      .collection("rides")
      .where("rideBuyer", "==", user.uid)
      .get();

    // Query to find rides where the current user is in the interestedUsers array
    const interestedQuerySnapshot = await firestore()
      .collection("rides")
      .where("interestedUsers", "array-contains", user.uid)
      .where("rideBuyer", "==", null)
      .get();

    // Merge the results of all queries
    const rides = [];

    ownerQuerySnapshot.forEach((doc) => {
      rides.push({ id: doc.id, ...doc.data() });
    });
    buyerQuerySnapshot.forEach((doc) => {
      // Check to prevent potential duplicates if a user is both owner and buyer
      if (!rides.some((ride) => ride.id === doc.id)) {
        rides.push({ id: doc.id, ...doc.data() });
      }
    });
    interestedQuerySnapshot.forEach((doc) => {
      // Check to prevent potential duplicates if a user is already in owner or buyer
      if (!rides.some((ride) => ride.id === doc.id)) {
        rides.push({ id: doc.id, ...doc.data() });
      }
    });

    setAllRides(rides);
    return rides;
  };
  const applyListenerToRide = useCallback(
    (rideId) => {
      const unsubscribe = firestore()
        .collection("rides")
        .doc(rideId)
        .onSnapshot((doc) => {
          const updatedRide = {
            id: doc.id,
            ...doc.data(),
          };

          setAllRides((prevRides) => {
            const rideIndex = prevRides.findIndex(
              (ride) => ride.id === updatedRide.id
            );
            if (rideIndex !== -1) {
              // Update the existing ride
              return prevRides.map((ride, index) =>
                index === rideIndex ? updatedRide : ride
              );
            } else {
              // Add the new ride to the array
              return [...prevRides, updatedRide];
            }
          });
        });

      setUnsubscribers((prevUnsubs) => [...prevUnsubs, unsubscribe]);
    },
    [setAllRides, setUnsubscribers]
  );

  const applyListenersToAllMyRides = useCallback(
    async (specificRideId) => {
      if (specificRideId) {
        applyListenerToRide(specificRideId);
      } else {
        const rides = await fetchMyRides();
        rides.forEach((ride) => {
          applyListenerToRide(ride.id);
        });
      }
    },
    [applyListenerToRide, fetchMyRides]
  );

  const cleanupListeners = useCallback(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
    setUnsubscribers([]);
  }, [unsubscribers]);

  const askForRide = async (ride, messageType, suggestionPrice) => {
    const updatedRideData = await addUserDataToRide(
      ride.id,
      messageType,
      suggestionPrice
    ); // Add user data to the ride
    await applyListenersToAllMyRides(ride.id); // Apply listeners to the ride
    return updatedRideData;
  };

  const addUserDataToRide = async (rideId, messageType, suggestionPrice) => {
    const rideRef = firestore().collection("rides").doc(rideId);
    const rideDoc = await rideRef.get();

    if (rideDoc.exists) {
      const rideData = rideDoc.data();
      const updatedRideData = {
        ...rideData,
        interestedUsers: [...rideData.interestedUsers, user.uid],
        [user.uid]: {
          messages: [
            {
              text: getRideMessageTextByType(messageType, suggestionPrice),
              type: messageType,
              createdAt: new Date(),
            },
          ],
          senderName: user.name,
          senderImg: user.profilePic,
        },
      };

      await rideRef.update(updatedRideData);
      return updatedRideData;
    }
  };

  const sendMessageInNegotiation = async (rideId, userId, text) => {
    const rideRef = firestore().collection("rides").doc(rideId);
    const rideDoc = await rideRef.get();

    if (rideDoc.exists) {
      const rideData = rideDoc.data();
      const updatedRideData = {
        ...rideData,
        [userId]: {
          ...rideData[userId],
          messages: [...rideData[userId].messages, text],
        },
      };

      await rideRef.update(updatedRideData);
    }
  };

  return {
    postNewRide,
    applyListenersToAllMyRides,
    allRides,
    cleanupListeners,
    cancelRide,
    askForRide,
    sendMessageInNegotiation,
  };
};

export default useMyRides;
