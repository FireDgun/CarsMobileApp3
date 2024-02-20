import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RideRow from "../components/RideRow";

const CloseSellRIdes = ({ allModeRides }) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set time components to zero

  const soldRides = allModeRides.filter(
    (ride) =>
      ride.rideBuyer &&
      new Date(ride.date).setHours(0, 0, 0, 0) > currentDate &&
      !ride.canceled
  );

  return (
    <View>
      <Text>CloseSellRIdes</Text>
      {soldRides.map((ride) => (
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

export default CloseSellRIdes;
