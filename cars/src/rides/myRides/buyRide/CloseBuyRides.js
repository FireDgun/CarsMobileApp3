import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";

const CloseBuyRides = ({ allModeRides, setScrollEnabled, tab }) => {
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
      <Text>CloseBuyRIdes</Text>
      {buyRides.map((ride) => (
        <View key={ride.id}>
          <RideRow ride={ride} setScrollEnabled={setScrollEnabled} tab={tab} />
        </View>
      ))}
    </View>
  );
};

export default CloseBuyRides;
