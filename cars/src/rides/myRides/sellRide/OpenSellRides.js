import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RideRow from "../components/RideRow";

const OpenSellRides = ({ allModeRides }) => {
  const futureRides = allModeRides.filter((ride) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time components to zero
    const rideDate = new Date(ride.date);
    rideDate.setHours(0, 0, 0, 0); // Set time components to zero
    return rideDate >= currentDate && !ride.buyer && !ride.canceled;
  });
  console.log(allModeRides);
  return (
    <View>
      <Text>OpenSellRides</Text>
      {futureRides.map((ride) => (
        <TouchableOpacity
          key={ride.id}
          onPress={() => {
            /* Navigate to ride details or perform an action */
          }}
        >
          <RideRow ride={ride} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OpenSellRides;
