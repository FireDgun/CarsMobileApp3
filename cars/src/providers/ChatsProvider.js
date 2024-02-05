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
  } = useChats();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Define an async function inside the useEffect
      const setupListeners = async () => {
        const unsubscribeFunctions = await applyListenersToAllMyChats();

        // Return the cleanup function directly from the async function
        return unsubscribeFunctions;
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
