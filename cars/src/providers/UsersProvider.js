import React, { createContext, useContext, useEffect } from "react";
import useUsers from "../hooks/useUsers";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const {
    allUsers,
    usersNumbers,
    getAllUsers,
    saveDetails,
    getUserById,
    saveUserExpoPushToken,
  } = useUsers();
  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();

    console.log("users provider");
  }, []);

  return (
    <UsersContext.Provider
      value={{
        allUsers,
        usersNumbers,
        saveDetails,
        getUserById,
        saveUserExpoPushToken,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context)
    throw new Error("useContacts must be used within a NameProvider");
  return context;
};
