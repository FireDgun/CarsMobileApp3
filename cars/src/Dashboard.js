import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import Header from "./layout/Header";
import RidesList from "./rides/RidesList";
import ChatsList from "./chats/ChatsList";
import useRideNavigation from "./hooks/useRideNavigation";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function Dashboard({ route }) {
  const [layoutReady, setLayoutReady] = useState(false); // Track layout readiness
  const navigation = useNavigation();

  const refFlatList = useRef(null);
  const {
    selectedTab,
    initialRidePage,
    initialTab,
    optionalNegotiationId,
    optionalNegotiationRideId,
  } = useRideNavigation(route);

  // useEffect(() => {
  //   let index = selectedTab === "rides" ? 1 : 0;
  //   refFlatList.current.scrollToIndex({ animated: true, index });
  // }, [selectedTab]); // Depend only on route for this effect

  useEffect(() => {
    if (refFlatList.current && layoutReady) {
      let index = selectedTab === "rides" ? 1 : 0;
      refFlatList.current.scrollToIndex({ animated: true, index });
    }
  }, [selectedTab]);

  const handleSetSelectedTab = (tab) => {
    navigation.navigate("Dashboard", {
      initialPage: tab,
    });
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
      <Header setSelectedTab={handleSetSelectedTab} />
      <FlatList
        ref={refFlatList}
        onLayout={() => setLayoutReady(true)}
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
