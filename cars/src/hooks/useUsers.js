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

  return {
    allUsers,
    usersNumbers,
    getAllUsers,
  };
}
