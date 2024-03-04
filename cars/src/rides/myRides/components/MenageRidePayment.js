import { View, Text, Button } from "react-native";
import React from "react";

const MenageRidePayment = ({ ride }) => {
  return (
    <View>
      <Button title="שלח תזכורת לתשלום" onPress={() => ride} />
      <Button title="שלח אסמכתא בעבור תשלום" onPress={() => ride} />
    </View>
  );
};

export default MenageRidePayment;
