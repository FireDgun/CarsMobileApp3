import { useState, useEffect, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../providers/AuthContext";

export default function useChats() {
  const { user } = useAuth();
  const [myChats, setMyChats] = useState([]);
  const [refreshListeners, setRefreshListeners] = useState(false);

  const fetchMyChats = useCallback(async () => {
    try {
      const querySnapshot = await firestore()
        .collection("chats")
        .where("chatParticipants", "array-contains", user?.uid)
        .get();

      const chats = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyChats(chats);
      return chats;
    } catch (error) {
      console.error("Error fetching chats: ", error);
      return [];
    }
  }, [user]);

  const sendMessage = async (chatId, messageContent) => {
    try {
      const message = {
        ...messageContent, // The text or other content of the message
        senderId: user?.uid,
        senderName: user?.name,
        senderImg: user?.profilePic,
        senderPhoneNumber: user?.phoneNumber,
        readBy: user ? [user.uid] : [],
        timestamp: new Date(), // Set the timestamp
      };

      await firestore()
        .collection("chats")
        .doc(chatId)
        .update({
          messages: firestore.FieldValue.arrayUnion(message), // Add the message to the array
        });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

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
  }, [myChats]);

  const createChat = async (senderId, getterId) => {
    let existingChat = myChats.find(
      (chat) =>
        chat.chatParticipants.includes(senderId) &&
        chat.chatParticipants.includes(getterId) &&
        chat.type == "private"
    );
    console.log("existingggg");
    console.log(existingChat);
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
      setMyChats((prev) => [...prev, { ...newChat, id: newChatRef.id }]);

      setRefreshListeners((prev) => !prev);
      return newChatRef.id;
    },
    []
  );
  return {
    myChats,
    refreshListeners,
    sendMessage,
    applyListenersToAllMyChats,
    createChat,
    fetchMyChats,
    createGroupChat,
  };
}
