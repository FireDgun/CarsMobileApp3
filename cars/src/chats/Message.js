import { View, Text, StyleSheet, Image } from "react-native";
import React, { memo } from "react";
import { formatMessageTime, getColorById } from "../utils/chatsDataHelpers";
const defaultImage = require("../../assets/avatars/driver.png"); // Replace with the actual path

const Message = memo(({ messageInfo, user, chatType }) => {
  const imageSource = messageInfo.senderImg
    ? { uri: messageInfo.senderImg }
    : defaultImage;

  return (
    <View
      style={[
        styles.messageContainer,
        messageInfo.senderId === user.uid
          ? styles.myMessageContainer
          : styles.otherMessageContainer,
        chatType !== "group" &&
          messageInfo.senderId === user.uid &&
          styles.alignRight,
      ]}
    >
      {chatType == "group" && messageInfo.senderId !== user.uid && (
        <Image source={imageSource} style={styles.profileImage} />
      )}
      <View
        style={
          messageInfo.senderId === user.uid
            ? styles.myMessage
            : styles.otherMessage
        }
      >
        {chatType == "group" && messageInfo.senderId !== user.uid && (
          <Text
            style={[
              styles.senderName,
              { color: getColorById(messageInfo.senderId) },
            ]}
          >
            {messageInfo.senderName}
          </Text>
        )}
        <Text>{messageInfo.text}</Text>
        <Text style={styles.time}>
          {formatMessageTime(messageInfo.timestamp.toDate())}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  otherMessageContainer: {
    justifyContent: "flex-start",
  },
  alignRight: {
    alignSelf: "flex-end",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 6,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DFF7DF",
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EFEFEF",
    padding: 8,
    borderRadius: 10,
    margin: 5,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 2,
  },
});

export default Message;
