import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NegotiationButtons from "./NegotiationButtons";

const NegotiationWindow = ({
  messages,
  buttons,
  expanded,
  setExpanded,
  ride,
  senderId,
}) => {
  const handleExpandCollapse = () => {
    setExpanded(!expanded);
  };
  const [enableSendButton, setEnableSendButton] = useState(true);
  const renderMessages = () => {
    return messages.map((message, index) => {
      const isContractor = message.type.includes("Contractor");
      const messageStyle = isContractor
        ? styles.contractorMessage
        : styles.userMessage;

      return (
        <View key={index} style={messageStyle}>
          <Text>{message.text}</Text>
        </View>
      );
    });
  };

  const renderButtons = () => {
    return buttons.map((button, index) => {
      const buttonStyle = button.style || styles.defaultButtonStyle;

      return (
        <TouchableOpacity
          key={index}
          style={buttonStyle}
          onPress={button.onClick}
        >
          <Text>{button.text}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={expanded ? styles.containerExpanded : styles.containerCollapsed}
    >
      <ScrollView style={{ width: "100%", height: "100%" }}>
        {renderMessages()}
      </ScrollView>
      {enableSendButton && (
        <NegotiationButtons
          ride={ride}
          messages={messages}
          senderId={senderId}
          setEnableSendButton={setEnableSendButton}
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

    height: 180,
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