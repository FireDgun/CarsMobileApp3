import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import NegotiationWindow from "./NegotiationWindow";

const NegotiationRow = ({
  senderName,
  senderImg,
  messages,
  buttons,
  senderId,
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleRowClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handleRowClick}>
      <View style={styles.rowContainer}>
        <Image source={{ uri: senderImg }} style={styles.senderImage} />
        <Text style={styles.senderName}>{senderName}</Text>
      </View>
      {expanded && (
        <NegotiationWindow
          messages={messages}
          buttons={buttons}
          expanded={expanded}
          setExpanded={setExpanded}
          senderId={senderId}
        />
      )}
    </TouchableOpacity>
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
