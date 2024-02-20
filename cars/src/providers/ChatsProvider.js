import React, { createContext, useContext, useEffect } from "react";
import useChats from "../hooks/useChats";
import { useAuth } from "./AuthContext";

export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
  const {
    myChats,
    refreshListeners,
    sendMessage,
    applyListenersToAllMyChats,
    createChat,
    createGroupChat,
    cancelRideOnChats,
    updateRideOnChat,
  } = useChats();

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      // Define an async function inside the useEffect
      const setupListeners = async () => {
        try {
          const unsubscribeFunctions = await applyListenersToAllMyChats();
          return unsubscribeFunctions;
        } catch (error) {
          console.error("Error applying listeners to chats:", error);
        }

        // Return the cleanup function directly from the async function
      };

      // Call the async function
      let unsubscribe;
      setupListeners().then((unsubscribeFunctions) => {
        unsubscribe = unsubscribeFunctions;
      });

      // Return the cleanup function from the useEffect
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [user, refreshListeners]);

  return (
    <ChatsContext.Provider
      value={{
        myChats,
        sendMessage,
        createChat,
        createGroupChat,
        cancelRideOnChats,
        updateRideOnChat,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};

export const useChatsContext = () => {
  const context = useContext(ChatsContext);
  if (!context)
    throw new Error("useContacts must be used within a NameProvider");
  return context;
};
