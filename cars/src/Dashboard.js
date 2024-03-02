import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import Header from "./layout/Header";
import RidesList from "./rides/RidesList";
import ChatsList from "./chats/ChatsList";

const { width } = Dimensions.get("window");

export default function Dashboard({ route }) {
  const [selectedTab, setSelectedTab] = useState(
    route?.params?.initialPage ?? "chats"
  );
  const [initialRidePage, setInitialRidePage] = useState(
    route?.params?.initialSelectedTab ?? "MySellRides"
  );
  const [layoutReady, setLayoutReady] = useState(false); // Track layout readiness

  const refFlatList = useRef(null);

  useEffect(() => {
    // Adjust this effect to respond directly to route changes
    const newInitialPage = route?.params?.initialPage ?? "chats";
    const newInitialRidePage =
      route?.params?.initialSelectedTab ?? "MySellRides";
    setSelectedTab(newInitialPage);
    setInitialRidePage(newInitialRidePage);

    const index = newInitialPage === "rides" ? 1 : 0;
    if (refFlatList.current & layoutReady) {
      refFlatList.current.scrollToIndex({ animated: false, index });
    }
  }, [route, layoutReady]); // Depend only on route for this effect

  const handleSetSelectedTab = (tab) => {
    setSelectedTab(tab);
    let index = tab === "rides" ? 1 : 0;
    refFlatList.current.scrollToIndex({ animated: true, index });
  };

  const renderItem = ({ item }) => {
    const Component = item.component;
    const extraProps =
      item.key === "rides" ? { initialSelectedTab: initialRidePage } : {};
    return (
      <View style={{ width }}>
        <Component {...extraProps} />
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={() => setLayoutReady(true)}>
      <Header setSelectedTab={handleSetSelectedTab} />
      <FlatList
        ref={refFlatList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={[
          { key: "chats", component: ChatsList },
          { key: "rides", component: RidesList },
        ]}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BEBDB8",
  },
  contentContainer: {
    flex: 1,
  },
});
