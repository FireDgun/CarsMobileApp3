import React, { useState, useRef, useEffect, useMemo } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import Footer from "../layout/Footer";
import RidesList from "../rides/RidesList";
import ChatsList from "../chats/ChatsList";
import useRideNavigation from "../hooks/useRideNavigation";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Dashboard = ({ route }) => {
  const [layoutReady, setLayoutReady] = useState(false);
  const refFlatList = useRef(null);

  const {
    selectedTab,
    setSelectedTab,
    initialRidePage,
    initialTab,
    optionalNegotiationId,
    optionalNegotiationRideId,
  } = useRideNavigation(route);

  useEffect(() => {
    console.log(route.params);
    if (route.params?.initialPage === "rides") {
      handleSetSelectedTab("rides");
    } else handleSetSelectedTab("chats");
  }, [route.params]);

  console.log(selectedTab);

  const handleSetSelectedTab = (tab, whoActivated) => {
    if (layoutReady === false) return;
    const index = tab === "rides" ? 1 : 0;
    setSelectedTab(tab);
    refFlatList.current.scrollToIndex({ animated: true, index });
  };

  const handleMomentumScrollEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const activeScreen = Math.round(offsetX / width) + 1; // Calculate the active screen index

    if (activeScreen === 1) {
      setSelectedTab("rides");
    } else {
      setSelectedTab("chats");
    }
  };

  const renderItem = ({ item }) => {
    const Component = item.component;
    const extraProps =
      item.key === "rides"
        ? {
            initialSelectedTab: initialRidePage,
            initialTab: initialTab,
            optionalNegotiationId: optionalNegotiationId,
            optionalNegotiationRideId: optionalNegotiationRideId,
          }
        : {};

    return (
      <View style={{ width }}>
        <Component {...extraProps} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={refFlatList}
        onLayout={() => setLayoutReady(true)}
        horizontal
        pagingEnabled
        data={[
          { key: "chats", component: ChatsList },
          { key: "rides", component: RidesList },
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.contentContainer}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
      <Footer setSelectedTab={handleSetSelectedTab} selectedTab={selectedTab} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBDB8",
  },
  contentContainer: {
    flex: 1,
  },
});

export default Dashboard;
