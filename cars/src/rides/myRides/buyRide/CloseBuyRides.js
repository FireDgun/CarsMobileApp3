import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";

const CloseBuyRides = ({ allModeRides }) => {
  const { user } = useAuth();
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time components to zero

  const buyRides = allModeRides.filter(
    (ride) =>
      ride.rideBuyer &&
      user.uid == ride.rideBuyer &&
      !ride.canceled &&
      new Date(ride.date).setHours(0, 0, 0, 0) > currentDate
  );

  return (
    <View>
      <Text>CloseSellRIdes</Text>
      {buyRides.map((ride) => (
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

export default CloseBuyRides;
