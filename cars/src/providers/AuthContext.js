import React, { createContext, useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import { useUsersContext } from "./UsersProvider";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [initializing, setInitializing] = useState(true);
  const { getUserById } = useUsersContext();
  const onAuthStateChanged = (user) => {
    if (user) {
      addDataFromDbToUser(user.uid);
    }
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const addDataFromDbToUser = async (id) => {
    const userData = await getUserById(id);
    setUser({ uid: id, ...userData.data() });
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) return null; // Loading state here

  return (
    <AuthContext.Provider value={{ user, addDataFromDbToUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a NameProvider");
  return context;
};
