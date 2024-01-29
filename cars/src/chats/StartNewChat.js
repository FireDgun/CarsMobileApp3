import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Contacts from "expo-contacts";
import Header from "../layout/Header";
import { fixPhoneFormat } from "../utils/phoneHelper";
import firestore from "@react-native-firebase/firestore";

export default function StartNewChat({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
    requestContactsPermission();
  }, []);

  const getAllUsers = async () => {
    const usersCollection = await firestore().collection("users").get();
    const usersData = usersCollection.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        name: docData.name,
        phoneNumber: docData.phoneNumber,
      };
    });

    console.log("Users Data:", usersData); // Log the complete array
    setAllUsers(usersData);
  };

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      getContacts();
    } else {
      console.log("Contacts permission denied");
    }
  };

  const getContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(
          data.map((element) => ({
            name: element.name,
            number: fixPhoneFormat(element.phoneNumbers?.[0]?.number),
          }))
        );
      }
    } catch (error) {
      console.log("Error fetching contacts: ", error);
    }
  };

  return (
    <View>
      <Header />
      <Text>Start a New Chat</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
