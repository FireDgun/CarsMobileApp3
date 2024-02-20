import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const WaitingForResponse = ({ isLoading }) => {
  return isLoading ? (
    <View>
      <Text>{"ממתין לתגובה..."}</Text>
      {isLoading && <ActivityIndicator />}
    </View>
  ) : null;
};

export default WaitingForResponse;
