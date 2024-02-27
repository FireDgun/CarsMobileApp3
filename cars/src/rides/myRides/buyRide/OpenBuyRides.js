import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";

const OpenBuyRides = ({ allModeRides }) => {
  const { user } = useAuth();
  const futureRides = allModeRides.filter((ride) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time components to zero
    const rideDate = new Date(ride.date);
    rideDate.setHours(0, 0, 0, 0); // Set time components to zero
    return (
      rideDate >= currentDate &&
      !ride.rideBuyer &&
      !ride.canceled &&
      ride.interestedUsers.includes(user.uid)
    );
  });
  return (
    <View>
      <Text>OpenSellRides</Text>
      {futureRides.map((ride) => (
        <View key={ride.id}>
          <RideRow ride={ride} />
        </View>
      ))}
    </View>
  );
};
export default OpenBuyRides;
