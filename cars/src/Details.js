import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
export default function Details({ route, navigation }) {
  const { uid, phoneNumber } = route.params;
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const saveDetails = async () => {
    try {
      await firestore().collection("users").doc(uid).set({
        name,
        dob,
        phoneNumber,
      });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error saving the details :" + error);
    }
  };
  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 40,
          marginTop: 150,
        }}
      >
        הוסף פרטים
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
        placeholder="שם החברה"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="תאריך הקמה"
        value={dob}
        onChangeText={setDob}
      />
      <TouchableOpacity
        onPress={saveDetails}
        style={{
          backgroundColor: "#841584",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          שמור
        </Text>
      </TouchableOpacity>
    </View>
  );
}
