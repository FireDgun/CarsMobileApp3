import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NegotiationButtons from "./NegotiationButtons";
import MenageRideButtons from "./MenageRideButtons";

const NegotiationWindow = ({
  messages,
  expanded,
  setExpanded,
  ride,
  senderId,
  setScrollEnabled,
  enableSendButton = true,
  tab,
}) => {
  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  };
  const handleBeginDrag = () => {
    setScrollEnabled(false);
  };
  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, []);
  // Handler to re-enable outer scroll when releasing the drag on the inner ScrollView
  const handleEndDrag = () => {
    setScrollEnabled(true);
  };
  const renderMessages = () => {
    return messages.map((message, index) => {
      const isContractor = message.type.includes("Contractor");
      const messageStyle = isContractor
        ? styles.contractorMessage
        : styles.userMessage;

      return (
        <TouchableWithoutFeedback
          key={index}
          onPressIn={handleBeginDrag}
          onPressOut={handleEndDrag}
          style={{ width: "100%" }}
        >
          <View style={{ width: "100%", backgroundColor: "transparent" }}>
            <View style={messageStyle}>
              <Text>{message.text}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <View
      style={expanded ? styles.containerExpanded : styles.containerCollapsed}
    >
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: false })
        }
      >
        {renderMessages()}
      </ScrollView>
      {tab == "Open" && (
        <NegotiationButtons
          ride={ride}
          messages={messages}
          senderId={senderId}
        />
      )}
      {/* <TouchableOpacity
        style={styles.expandCollapseButton}
        onPress={handleExpandCollapse}
      >
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="white"
        />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerExpanded: {
    backgroundColor: "#E6F2FF",
    padding: 5,
    paddingBottom: 0,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",

    height: 250,
  },
  containerCollapsed: {
    backgroundColor: "#E6F2FF",
    padding: 10,
    borderRadius: 5,
    height: 50,
    flexDirection: "row",
  },
  contractorMessage: {
    backgroundColor: "#E6F2FF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  defaultButtonStyle: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  expandCollapseButton: {
    backgroundColor: "#8B5CF6",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxHeight: 20,
  },
});
export default NegotiationWindow;
