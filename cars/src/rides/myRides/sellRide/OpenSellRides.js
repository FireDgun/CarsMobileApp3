import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RideRow from "../components/RideRow";

const OpenSellRides = ({ allModeRides, setScrollEnabled }) => {
  const futureRides = allModeRides.filter((ride) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time components to zero
    const rideDate = new Date(ride.date);
    rideDate.setHours(0, 0, 0, 0); // Set time components to zero
    return rideDate >= currentDate && !ride.rideBuyer && !ride.canceled;
  });
  return (
    <View>
      <Text>OpenSellRides</Text>
      {futureRides.map((ride) => (
        <View key={ride.id}>
          <RideRow ride={ride} setScrollEnabled={setScrollEnabled} />
        </View>
      ))}
    </View>
  );
};

export default OpenSellRides;
