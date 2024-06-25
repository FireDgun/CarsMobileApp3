import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { fixPhoneFormat } from "../utils/phoneHelper";
import CodeInput from "../components/CodeInput";
import PhoneInput from "../components/PhoneInput";

export default function LoginScreen() {
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
        <PhoneInput
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          signInWithPhoneNumber={signInWithPhoneNumber}
          isLoading={isLoading}
          wrongNumber={wrongNumber}
          setWrongNumber={setWrongNumber}
        />
      ) : (
        <CodeInput
          code={code}
          setCode={setCode}
          confirmCode={confirmCode}
          isLoading={isLoading}
          error={error}
          setConfirm={setConfirm}
          setError={setError}
          phoneNumber={phoneNumber}
        />
      )}
    </View>
  );
}
