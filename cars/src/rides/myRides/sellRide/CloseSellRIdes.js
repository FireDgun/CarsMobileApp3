import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RideRow from "../components/RideRow";

const CloseSellRIdes = ({ allModeRides, setScrollEnabled, tab }) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time components to zero

  const soldRides = allModeRides.filter(
    (ride) =>
      ride.rideBuyer &&
      new Date(ride.date).setHours(0, 0, 0, 0) >= currentDate &&
      !ride.canceled
  );

  return (
    <View>
      <Text>CloseSellRIdes</Text>
      {soldRides.map((ride) => (
        <View key={ride.id}>
          <RideRow ride={ride} setScrollEnabled={setScrollEnabled} tab={tab} />
        </View>
      ))}
    </View>
  );
};

export default CloseSellRIdes;
