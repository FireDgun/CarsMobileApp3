import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../../../layout/Header";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";
import SubNavBarMyRides from "../components/SubNavBarMyRides";

const MySellRides = () => {
  const { allRides } = useRidesContext();
  const { user } = useAuth();
  const mySellRides = allRides.filter((ride) => ride.rideOwner === user.uid);
  console.log(user.name);
  console.log(user.uid);

  console.log(allRides);
  return (
    <View style={{ flex: 1 }}>
      <SubNavBarMyRides mode={"sell"} allModeRides={mySellRides} />
    </View>
  );
};

export default MySellRides;
