import { View, Text } from "react-native";
import React from "react";
import Header from "../../../layout/Header";
import SubNavBarMyRides from "../components/SubNavBarMyRides";

const MyBuyRides = () => {
  return (
    <View>
      <SubNavBarMyRides mode={"buy"} />

      <Text>MyBuyRides</Text>
    </View>
  );
};

export default MyBuyRides;
