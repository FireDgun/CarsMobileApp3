import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Footer from "../../../layout/Footer";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";
import SubNavBarMyRides from "../components/SubNavBarMyRides";

const MySellRides = ({
  setScrollEnabled,
  initialTab,
  optionalNegotiationId = "",
  optionalNegotiationRideId = "",
}) => {
  const { allRides } = useRidesContext();
  const { user } = useAuth();
  const mySellRides = allRides.filter((ride) => ride.rideOwner === user?.uid);
  return (
    <View style={{ flex: 1 }}>
      <SubNavBarMyRides
        mode={"sell"}
        allModeRides={mySellRides}
        setScrollEnabled={setScrollEnabled}
        initialTab={initialTab}
        optionalNegotiationId={optionalNegotiationId}
        optionalNegotiationRideId={optionalNegotiationRideId}
      />
    </View>
  );
};

export default MySellRides;
