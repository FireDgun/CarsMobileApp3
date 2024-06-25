import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const CodeInput = ({
  code,
  setCode,
  confirmCode,
  isLoading,
  error,
  setConfirm,
  setError,
  phoneNumber,
}) => {
  return (
    <>
      <Text style={{ marginBottom: 20, fontSize: 18 }}>
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
        {!isLoading ? (
          <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
            אישור
          </Text>
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
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
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              {phoneNumber} לא נכון?
            </Text>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              שנה מספר טלפון
            </Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
};

export default CodeInput;
