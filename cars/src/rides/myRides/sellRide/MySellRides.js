import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../../layout/Header";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";

const MySellRides = () => {
  const { allRides } = useRidesContext();
  const { user } = useAuth();
  const mySellRides = allRides.filter((ride) => ride.rideOwner === user.uid);
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
        My Sell Rides
      </Text>
      {mySellRides.map((ride) => (
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

export default MySellRides;
