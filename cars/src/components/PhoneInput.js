import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const PhoneInput = ({
  phoneNumber,
  setPhoneNumber,
  signInWithPhoneNumber,
  isLoading,
  wrongNumber,
  setWrongNumber,
}) => {
  return (
    <>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
        הקלד את מספר הטלפון
      </Text>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="לדוגמא: 052-1231231"
        value={phoneNumber}
        onChangeText={(text) => {
          setWrongNumber(false);
          setPhoneNumber(text);
        }}
      />
      <TouchableOpacity
        onPress={signInWithPhoneNumber}
        style={{
          backgroundColor: "#841584",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        {!isLoading ? (
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            שלח קוד
          </Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
      </TouchableOpacity>
      {wrongNumber && (
        <Text style={{ color: "red", marginBottom: 10 }}>
          מספר טלפון לא תקין, אנא נסה שוב
        </Text>
      )}
    </>
  );
};

export default PhoneInput;
