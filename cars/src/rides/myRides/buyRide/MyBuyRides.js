import { View, Text } from "react-native";
import React from "react";
import Header from "../../../layout/Header";
import SubNavBarMyRides from "../components/SubNavBarMyRides";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";

const MyBuyRides = ({ setScrollEnabled }) => {
  const { allRides } = useRidesContext();
  const { user } = useAuth();
  const myBuyRides = allRides.filter((ride) => ride.rideOwner !== user?.uid);
  return (
    <View style={{ flex: 1 }}>
      <SubNavBarMyRides
        mode={"buy"}
        allModeRides={myBuyRides}
        setScrollEnabled={setScrollEnabled}
      />
    </View>
  );
};

export default MyBuyRides;
