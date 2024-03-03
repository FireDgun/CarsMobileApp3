import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CloseBuyRides from "../buyRide/CloseBuyRides";
import OpenBuyRides from "../buyRide/OpenBuyRides";
import OpenSellRides from "../sellRide/OpenSellRides";
import HistoryBuyRides from "../buyRide/HistoryBuyRides";
import HistorySellRides from "../sellRide/HistorySellRides";
import CloseSellRIdes from "../sellRide/CloseSellRIdes";
import { useNavigation } from "@react-navigation/native";

const SubNavBarMyRides = ({
  mode,
  allModeRides,
  setScrollEnabled,
  initialTab = "Open",
  optionalNegotiationId = "",
  optionalNegotiationRideId = "",
}) => {
  const navigation = useNavigation();
  const handleTabClick = (tab) => {
    navigation.navigate("Dashboard", {
      initialPage: "rides",
      initialSelectedTab: mode === "buy" ? "MyBuyRides" : "MySellRides",
      initialTab: tab,
    });
  };
  console.log(mode);
  const renderCloseComponent = () => {
    if (mode === "buy") {
      return (
        <CloseBuyRides
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
        />
      );
    } else if (mode === "sell") {
      return (
        <CloseSellRIdes
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
        />
      );
    }
  };

  const renderOpenComponent = () => {
    if (mode === "buy") {
      return (
        <OpenBuyRides
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
          optionalNegotiationId={optionalNegotiationId}
          optionalNegotiationRideId={optionalNegotiationRideId}
        />
      );
    } else if (mode === "sell") {
      return (
        <OpenSellRides
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
          optionalNegotiationId={optionalNegotiationId}
          optionalNegotiationRideId={optionalNegotiationRideId}
        />
      );
    }
  };

  const renderHistoryComponent = () => {
    if (mode === "buy") {
      return (
        <HistoryBuyRides
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
        />
      );
    } else if (mode === "sell") {
      return (
        <HistorySellRides
          allModeRides={allModeRides}
          setScrollEnabled={setScrollEnabled}
        />
      );
    }
  };
  let content;

  switch (initialTab) {
    case "Close":
      content = renderCloseComponent();
      break;
    case "History":
      content = renderHistoryComponent();
      break;
    case "Open":
      content = renderOpenComponent();
      break;
    default:
      content = <Text>Select a tab</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.subNavBar}>
        <TouchableOpacity
          style={[styles.tab, initialTab === "Open" && styles.activeTab]}
          onPress={() => handleTabClick("Open")}
        >
          <Text>פתוחות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, initialTab === "Close" && styles.activeTab]}
          onPress={() => handleTabClick("Close")}
        >
          <Text>סגורות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, initialTab === "History" && styles.activeTab]}
          onPress={() => handleTabClick("History")}
        >
          <Text>היסטוריה</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentArea}>{content}</View>
    </View>
  );
};

// Example styles, you might need to adjust them according to your needs
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subNavBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f2f2f2",
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  contentArea: {
    padding: 20,
    // Style for the content area
  },
});
export default SubNavBarMyRides;
