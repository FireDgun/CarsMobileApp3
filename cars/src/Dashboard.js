import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import Header from "./layout/Header";
import RidesList from "./rides/RidesList";
import ChatsList from "./chats/ChatsList";

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("chats");
  const refFlatList = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  const handleSetSelectedTab = (tab) => {
    setSelectedTab(tab);
    if (isLayoutReady) {
      let index = tab === "rides" ? 1 : 0;
      refFlatList.current.scrollToIndex({ animated: true, index });
    }
  };

  const onLayout = () => {
    setIsLayoutReady(true);
    // Optionally scroll to the initial tab here if it's not "chats"
    if (selectedTab !== "chats") {
      let index = selectedTab === "rides" ? 1 : 0;
      refFlatList.current.scrollToIndex({ animated: false, index });
    }
  };

  return (
    <View style={styles.container}>
      <Header setSelectedTab={handleSetSelectedTab} />
      <FlatList
        ref={refFlatList}
        horizontal
        pagingEnabled
        onLayout={onLayout}
        showsHorizontalScrollIndicator={false}
        data={[
          { key: "chats", component: ChatsList },
          { key: "rides", component: RidesList },
        ]}
        renderItem={({ item }) => (
          <View style={{ width }}>{React.createElement(item.component)}</View>
        )}
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
