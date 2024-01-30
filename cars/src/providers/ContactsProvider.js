import { View, Text } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { fixPhoneFormat } from "../utils/phoneHelper";

const ContactsContext = createContext(null);

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    requestContactsPermission();
  }, []);

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
            phoneNumber: fixPhoneFormat(element.phoneNumbers?.[0]?.number),
          }))
        );
      }
    } catch (error) {
      console.log("Error fetching contacts: ", error);
    }
  };

  return (
    <>
      <ContactsContext.Provider value={contacts}>
        {children}
      </ContactsContext.Provider>
    </>
  );
};

export default ContactsProvider;

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context)
    throw new Error("useContacts must be used within a NameProvider");
  return context;
};
