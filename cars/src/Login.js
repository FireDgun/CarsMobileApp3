import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { fixPhoneFormat } from "./utils/phoneHelper";
export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [error, setError] = useState("");
  const [wrongNumber, setWrongNumber] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const signInWithPhoneNumber = async () => {
    try {
      setIsLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(
        "+972" + phoneNumber
      );
      setConfirm(confirmation);
    } catch (error) {
      setWrongNumber(true);
      console.log("Error sending code: " + error);
    }
    setIsLoading(false);
  };

  const confirmCode = async () => {
    try {
      setIsLoading(true);
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
    setIsLoading(false);
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
            {!isLoading && (
              <Text
                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
              >
                שלח קוד
              </Text>
            )}
            {isLoading && <ActivityIndicator size="small" color="#fff" />}
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
            {!isLoading && (
              <Text
                style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
              >
                אישור
              </Text>
            )}
            {isLoading && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>

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
                  {phoneNumber} לא נכון?
                </Text>
                <Text
                  style={{ color: "white", fontSize: 22, fontWeight: "bold" }}
                >
                  שנה מספר טלפון
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
}
