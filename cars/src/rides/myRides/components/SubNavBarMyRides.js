import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import CloseBuyRides from "../buyRide/CloseBuyRides";
import OpenBuyRides from "../buyRide/OpenBuyRides";
import OpenSellRides from "../sellRide/OpenSellRides";
import HistoryBuyRides from "../buyRide/HistoryBuyRides";
import HistorySellRides from "../sellRide/HistorySellRides";
import CloseSellRIdes from "../sellRide/CloseSellRIdes";

const SubNavBarMyRides = ({ mode, allModeRides }) => {
  const [activeTab, setActiveTab] = useState("Open");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderCloseComponent = () => {
    if (mode === "buy") {
      return <CloseBuyRides allModeRides={allModeRides} />;
    } else if (mode === "sell") {
      return <CloseSellRIdes allModeRides={allModeRides} />;
    }
  };

  const renderOpenComponent = () => {
    if (mode === "buy") {
      return <OpenBuyRides allModeRides={allModeRides} />;
    } else if (mode === "sell") {
      return <OpenSellRides allModeRides={allModeRides} />;
    }
  };

  const renderHistoryComponent = () => {
    if (mode === "buy") {
      return <HistoryBuyRides allModeRides={allModeRides} />;
    } else if (mode === "sell") {
      return <HistorySellRides allModeRides={allModeRides} />;
    }
  };
  let content;

  switch (activeTab) {
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
          style={[styles.tab, activeTab === "Open" && styles.activeTab]}
          onPress={() => handleTabClick("Open")}
        >
          <Text>פתוחות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Close" && styles.activeTab]}
          onPress={() => handleTabClick("Close")}
        >
          <Text>סגורות</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
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
