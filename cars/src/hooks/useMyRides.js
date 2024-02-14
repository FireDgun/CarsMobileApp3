import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../providers/AuthContext";
import { useCallback, useState } from "react";

const useMyRides = () => {
  const { user } = useAuth();
  const [allRides, setAllRides] = useState([]);
  const [unsubscribers, setUnsubscribers] = useState([]);

  const postNewRide = async (ride) => {
    try {
      // Add the ride to the 'rides' collection with an additional 'rideOwner' field
      const docRef = await firestore()
        .collection("rides")
        .add({
          ...ride,
          rideOwner: user.uid, // Add the user's UID as the 'rideOwner' field
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

  async function fetchMyRides() {
    if (!user?.uid) return []; // Ensure user UID is available
    console.log("fetching");
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

    // Merge the results of both queries
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
    setAllRides(rides);
    return rides;
  }
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

          setAllRides((prevRides) =>
            prevRides.map((c) => (c.id === updatedRide.id ? updatedRide : c))
          );
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
    [applyListenerToRide]
  );

  const cleanupListeners = useCallback(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
    setUnsubscribers([]);
  }, [unsubscribers]);

  return {
    postNewRide,
    applyListenersToAllMyRides,
    allRides,
    cleanupListeners,
  };
};

export default useMyRides;
