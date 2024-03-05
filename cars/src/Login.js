import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { fixPhoneFormat } from "./utils/phoneHelper";
import { useContacts } from "./providers/ContactsProvider";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [wrongNumber, setWrongNumber] = useState(false);
  const navigation = useNavigation();

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        "+972" + phoneNumber
      );
      setConfirm(confirmation);
    } catch (error) {
      setWrongNumber(true);
      console.log("Error sending code: " + error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      let number = fixPhoneFormat(phoneNumber);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: userDocument.exists ? "Dashboard" : "Details",
            params: { uid: user.uid, phoneNumber: number },
          },
        ],
      });
    } catch (error) {
      setError("קוד שגוי, נסו שוב");
      console.log("Invalid code: " + error);
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
        התחבר/י באמצעות הודעת סמס
      </Text>
      {!confirm ? (
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
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              שלח קוד
            </Text>
          </TouchableOpacity>
          {wrongNumber && (
            <Text style={{ color: "red", marginBottom: 10 }}>
              מספר טלפון לא תקין, אנא נסה שוב
            </Text>
          )}
        </>
      ) : (
        <>
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
            }}
          >
            הקלד כאן את הקוד שהתקבל
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
            placeholder="הקלד כאן את הקוד"
            value={code}
            onChangeText={setCode}
          />
          {error === "" && (
            <TouchableOpacity
              onPress={confirmCode}
              style={{
                backgroundColor: "#841584",
                padding: 10,
                borderRadius: 5,
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
              >
                אישור
              </Text>
            </TouchableOpacity>
          )}
          {error !== "" && (
            <>
              <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>

              <TouchableOpacity
                onPress={() => {
                  setConfirm(null);
                  setError("");
                  setCode("");
                }}
                style={{
                  backgroundColor: "#841584",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                >
                  חזור
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
}
