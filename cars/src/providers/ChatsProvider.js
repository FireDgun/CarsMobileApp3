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
  } = useChats();

  const { user } = useAuth();

  useEffect(() => {
    console.log("render");
    const unsubscribeFunctions = applyListenersToAllMyChats(myChats);
    return () => {
      unsubscribeFunctions();
    };
  }, [user, refreshListeners]);

  return (
    <ChatsContext.Provider
      value={{
        myChats,
        sendMessage,
        createChat,
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
