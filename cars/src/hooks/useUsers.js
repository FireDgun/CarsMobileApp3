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
        id: doc.id,
        name: docData.name,
        phoneNumber: docData.phoneNumber,
      };
    });
    setAllUsers(usersData);
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

  return {
    allUsers,
    usersNumbers,
    getAllUsers,
    saveDetails,
  };
}
