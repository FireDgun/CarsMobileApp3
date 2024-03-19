const express = require("express");
const { Expo } = require("expo-server-sdk");
require("dotenv").config();
const { handleError } = require("../../utils/handleErrors");

// Initialize express router
const router = express.Router();

// Initialize a new Expo SDK client
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

router.get("/", async (req, res) => {
  try {
    return res.send("Hello world");
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Endpoint to send notifications
router.post("/send-notifications", async (req, res) => {
  let messages = [];
  const messageArray = req.body; // Expecting messageArray to be an array of { pushToken, body, data } objects

  // Validate and prepare messages
  for (let message of messageArray) {
    if (!Expo.isExpoPushToken(message.pushToken)) {
      console.error(
        `Push token ${message.pushToken} is not a valid Expo push token`
      );
    } else {
      messages.push({
        to: message.pushToken,
        sound: "default",
        body: message.body,
        data: message.data,
      });
    }
  }

  // Send notifications in chunks
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  try {
    for (let chunk of chunks) {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log("Tickets", ticketChunk);
      tickets.push(...ticketChunk);
    }
    return res
      .status(200)
      .json({ message: "Notifications sent successfully", tickets });
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
