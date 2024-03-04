import { View, Text, Button } from "react-native";
import React from "react";

const MenageRideButtons = ({ ride }) => {
  return (
    <View>
      <Button title="עריכת נסיעה" onPress={() => ride} />
      <Button title="ביטול נסיעה" onPress={() => ride} />
    </View>
  );
};

export default MenageRideButtons;
