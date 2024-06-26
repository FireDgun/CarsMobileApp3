import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "../../../providers/AuthContext";
import RideRow from "../components/RideRow";

const HistoryBuyRides = ({ allModeRides, setScrollEnabled, tab }) => {
  const { user } = useAuth();
  const pastRides = allModeRides.filter((ride) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set time components to zero
    const rideDate = new Date(ride.date);
    rideDate.setHours(0, 0, 0, 0); // Set time components to zero
    return (
      (ride.rideBuyer == user.uid && rideDate < currentDate) || ride.canceled
    );
  });

  return (
    <View>
      <Text>HistoryBuyRides</Text>
      {pastRides.map((ride) => (
        <View
          key={ride.id}
          style={[
            styles.rideContainer,
            ride.canceled && styles.canceledRideContainer,
          ]}
        >
          <RideRow ride={ride} setScrollEnabled={setScrollEnabled} tab={tab} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rideContainer: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  canceledRideContainer: {
    backgroundColor: "#FFCDD2",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
export default HistoryBuyRides;
