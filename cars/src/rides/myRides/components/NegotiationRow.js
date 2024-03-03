import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import NegotiationWindow from "./NegotiationWindow";
const defaultImage = require("../../../../assets/avatars/driver.png"); // Replace with the actual path

const NegotiationRow = ({
  senderName,
  senderImg,
  messages,
  ride,
  senderId,
  setScrollEnabled,
  initialExpand = false,
}) => {
  const [expanded, setExpanded] = useState(initialExpand);
  const handleRowClick = () => {
    setExpanded((prev) => !prev);
  };
  const imageSource = senderImg ? { uri: senderImg } : defaultImage;

  useEffect(() => {
    setExpanded(initialExpand);
  }, [initialExpand]);
  return (
    <View>
      <TouchableOpacity onPress={handleRowClick}>
        <View style={styles.rowContainer}>
          <Image source={imageSource} style={styles.senderImage} />
          <Text style={styles.senderName}>{senderName}</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <NegotiationWindow
          messages={messages}
          expanded={expanded}
          setExpanded={setExpanded}
          ride={ride}
          senderId={senderId}
          setScrollEnabled={setScrollEnabled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  senderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  senderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NegotiationRow;
