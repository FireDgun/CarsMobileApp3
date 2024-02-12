import { View, Text } from "react-native";
import React from "react";

const Divider = ({ style }) => {
  return (
    <View
      style={[
        { height: 1, backgroundColor: "#e0e0e0", marginVertical: 8 },
        style,
      ]}
    />
  );
};

export default Divider;
