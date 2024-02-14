import React, { createContext, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import useMyRides from "../hooks/useMyRides";

export const RidesContext = createContext();

export const RidesProvider = ({ children }) => {
  const {
    allRides,
    applyListenersToAllMyRides,
    postNewRide,
    cleanupListeners,
  } = useMyRides();
  const { user } = useAuth();

  useEffect(() => {
    // Apply listeners only if there is a user logged in
    if (user) {
      applyListenersToAllMyRides();
    }

    // Cleanup function to remove all listeners when the component unmounts or dependencies change
    return () => {
      cleanupListeners();
    };
  }, [user]); // Depend on cleanupListeners and applyListenersToAllMyRides as well

  return (
    <RidesContext.Provider
      value={{
        allRides,
        postNewRide,
      }}
    >
      {children}
    </RidesContext.Provider>
  );
};

export const useRidesContext = () => {
  const context = useContext(RidesContext);
  if (!context) {
    throw new Error("useRidesContext must be used within a RidesProvider");
  }
  return context;
};
