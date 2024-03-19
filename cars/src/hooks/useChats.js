import { useState, useEffect, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../providers/AuthContext";
import { sendNotifications } from "../services/notificationsService";
import { useUsersContext } from "../providers/UsersProvider";

export default function useChats() {
  const { user } = useAuth();
  const [myChats, setMyChats] = useState([]);
  const [refreshListeners, setRefreshListeners] = useState(false);
  const { allUsers } = useUsersContext();

  const fetchMyChats = useCallback(async () => {
    if (!user) return [];
    try {
      const querySnapshot = await firestore()
        .collection("chats")
        .where("chatParticipants", "array-contains", user?.uid)
        .get();
      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let globalChat;
      //globalChat = await addGlobalGroup(); // Call the addGlobalGroup function
      const allChats = globalChat ? [globalChat, ...chats] : chats;

      setMyChats(allChats);
      return allChats;
    } catch (error) {
      console.error("Error fetching chats: ", error);
      return [];
    }
  }, [user]);

  const addGlobalGroup = useCallback(async () => {
    try {
      const chatWithIdLSwLk6Ph6VHUaRn1x4tL = await firestore()
        .collection("chats")
        .doc("LSwLk6Ph6VHUaRn1x4tL")
        .get();
      if (chatWithIdLSwLk6Ph6VHUaRn1x4tL.exists) {
        const chatDataLSwLk6Ph6VHUaRn1x4tL = {
          id: chatWithIdLSwLk6Ph6VHUaRn1x4tL.id,
          ...chatWithIdLSwLk6Ph6VHUaRn1x4tL.data(),
        };

        return chatDataLSwLk6Ph6VHUaRn1x4tL;
      }
    } catch (error) {
      console.error("Error adding global group chat: ", error);
    }
  }, []);

  const sendMessage = useCallback(
    async (chatId, messageContent, type) => {
      try {
        const message = {
          ...messageContent, // The text or other content of the message
          senderId: user?.uid,
          senderName: user?.name,
          senderImg: user?.profilePic,
          senderPhoneNumber: user?.phoneNumber,
          readBy: user ? [user.uid] : [],
          timestamp: new Date(), // Set the timestamp
          type: type,
        };

        await firestore()
          .collection("chats")
          .doc(chatId)
          .update({
            messages: firestore.FieldValue.arrayUnion(message), // Add the message to the array
          });
        const chat = myChats.find((chat) => chat.id === chatId);
        const otherParticipant = chat.chatParticipants.filter(
          (p) => p !== user.uid
        );
        const otherParticipantPushToken = allUsers
          .filter((u) => otherParticipant.includes(u.uid))
          .flatMap((u) => u.expoPushTokens);
        const notifications = otherParticipantPushToken.map((token) => ({
          pushToken: token,
          body: message.text,
          data: { chatId: chat.id },
        }));
        sendNotifications(notifications);
      } catch (error) {
        console.error("Error sending message: ", error);
      }
    },
    [user, myChats]
  );

  const applyListenersToAllMyChats = useCallback(async () => {
    const unsubscribers = [];
    const chats = await fetchMyChats();
    chats.forEach((chat, index) => {
      const unsubscribe = firestore()
        .collection("chats")
        .doc(chat.id)
        .onSnapshot((doc) => {
          const updatedChat = {
            id: doc.id,
            ...doc.data(),
          };

          setMyChats((prevChats) =>
            prevChats.map((c) => (c.id === updatedChat.id ? updatedChat : c))
          );
        });

      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [myChats, fetchMyChats]);

  const createChat = async (senderId, getterId) => {
    let existingChat = myChats.find(
      (chat) =>
        chat.chatParticipants.includes(senderId) &&
        chat.chatParticipants.includes(getterId) &&
        chat.type == "private"
    );

    if (existingChat) {
      // Chat exists, get the chat ID and send message
      return existingChat.id;
    } else {
      // If chat doesn't exist, create new chat
      const newChat = {
        chatParticipants: [senderId, getterId],
        messages: [],
        type: "private",

        // ... other chat details (Image, Chat name, etc.)
      };
      const newChatRef = await firestore().collection("chats").add(newChat);

      setMyChats((prev) => [...prev, { ...newChat, id: newChatRef.id }]);

      setRefreshListeners((prev) => !prev);
      return newChatRef.id;
    }
  };
  const createGroupChat = useCallback(
    async (participants, image = "", name = "") => {
      // If chat doesn't exist, create new chat
      const newChat = {
        chatParticipants: participants,
        messages: [],
        image: image,
        name: name,
        type: "group",
        // ... other chat details (Image, Chat name, etc.)
      };

      const newChatRef = await firestore().collection("chats").add(newChat);
      const otherParticipant = participants.filter((p) => p !== user.uid);
      const otherParticipantPushToken = allUsers
        .filter((u) => otherParticipant.includes(u.uid))
        .flatMap((u) => u.expoPushTokens);
      const notifications = otherParticipantPushToken.map((token) => ({
        pushToken: token,
        body: "צורפת לקבוצה חדשה",
        data: { chatId: newChatRef.id },
      }));
      sendNotifications(notifications);
      setMyChats((prev) => [...prev, { ...newChat, id: newChatRef.id }]);

      setRefreshListeners((prev) => !prev);
      return newChatRef.id;
    },
    []
  );

  const cancelRideOnChats = useCallback(
    async (rideId) => {
      try {
        myChats.forEach(async (chat) => {
          let hasChanges = false;
          const updatedMessages = chat.messages.map((message) => {
            if (
              message.type === "ride" &&
              JSON.parse(message.text)?.id === rideId
            ) {
              const updatedRide = {
                ...JSON.parse(message.text),
                canceled: true,
              };
              message.text = JSON.stringify(updatedRide);
              hasChanges = true;
            }
            return message;
          });
          if (hasChanges) {
            await firestore()
              .collection("chats")
              .doc(chat.id)
              .update({ messages: updatedMessages });
          }
        });
      } catch (error) {
        console.error("Error canceling ride on chats: ", error);
      }
    },
    [myChats]
  );

  const closeRideWithMeOnChats = useCallback(
    async (rideId) => {
      try {
        myChats.forEach(async (chat) => {
          let hasChanges = false;
          const updatedMessages = chat.messages.map((message) => {
            if (
              message.type === "ride" &&
              JSON.parse(message.text)?.id === rideId
            ) {
              const updatedRide = {
                ...JSON.parse(message.text),
                rideBuyer: user.uid,
              };
              message.text = JSON.stringify(updatedRide);
              hasChanges = true;
            }
            return message;
          });
          if (hasChanges) {
            await firestore()
              .collection("chats")
              .doc(chat.id)
              .update({ messages: updatedMessages });
          }
        });
      } catch (error) {
        console.error("Error canceling ride on chats: ", error);
      }
    },
    [myChats]
  );
  const updateRideOnChat = useCallback(
    async (rideId, updatedRide) => {
      try {
        myChats.forEach(async (chat) => {
          let hasChanges = false;

          const updatedMessages = chat.messages.map((message) => {
            if (
              message.type === "ride" &&
              JSON.parse(message.text)?.id === rideId
            ) {
              message.text = JSON.stringify(updatedRide);
              hasChanges = true;
            }
            return message;
          });

          if (hasChanges) {
            await firestore()
              .collection("chats")
              .doc(chat.id)
              .update({ messages: updatedMessages });
          }
        });
      } catch (error) {
        console.error("Error updating ride on chats: ", error);
      }
    },
    [myChats]
  );
  return {
    myChats,
    refreshListeners,
    sendMessage,
    applyListenersToAllMyChats,
    createChat,
    fetchMyChats,
    createGroupChat,
    cancelRideOnChats,
    updateRideOnChat,
    closeRideWithMeOnChats,
  };
}
