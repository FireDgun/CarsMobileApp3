import { useCallback, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [usersNumbers, setUsersNumbers] = useState([]);

  useEffect(() => {
    setUsersNumbers(allUsers.map((user) => user.phoneNumber));
  }, [allUsers]);

  const getAllUsers = useCallback(async () => {
    const usersCollection = await firestore().collection("users").get();
    const usersData = usersCollection.docs.map((doc) => {
      const docData = doc.data();
      return {
        uid: doc.id,
        name: docData.name,
        phoneNumber: docData.phoneNumber,
        profilePic: docData.profilePic,

        selectedLocations: docData.selectedLocations,
      };
    });
    setAllUsers(usersData);
  }, []);

  const getUserById = useCallback(async (id) => {
    try {
      return await firestore().collection("users").doc(id).get(); //YOU WAS HERE TO ADD ID
    } catch (error) {
      console.log("Error get user ", id);
    }
  }, []);

  const saveDetails = useCallback(
    async (
      uid,
      name,
      selectedMonth,
      selectedYear,
      phoneNumber,
      selectedLocations,
      profilePic,
      navigation
    ) => {
      try {
        await firestore()
          .collection("users")
          .doc(uid)
          .set({
            name,
            dob: `${selectedMonth}/${selectedYear}`, // Store DOB as "month/year"
            phoneNumber,
            selectedLocations, // Store selected locations
            profilePic,
          });
        navigation.navigate("Dashboard");
      } catch (error) {
        console.log("Error saving the details :" + error);
      }
    },
    []
  );
  const saveUserExpoPushToken = useCallback(async (uid, expoPushTokens) => {
    try {
      await firestore().collection("users").doc(uid).set(
        {
          expoPushTokens,
        },
        { merge: true }
      ); // Use merge option to update the document without overwriting existing fields
      console.log("Expo Push Token saved successfully");
    } catch (error) {
      console.log("Error saving the Expo Push Token: " + error);
    }
  }, []);

  return {
    allUsers,
    usersNumbers,
    getAllUsers,
    saveDetails,
    getUserById,
    saveUserExpoPushToken,
  };
}
