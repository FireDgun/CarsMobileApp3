import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { createContext, useContext, useState } from "react";
export const MyModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setModalContent(null);
  };
  // Full-screen modal view
  const FullScreenModal = ({ children }) => (
    <View style={styles.fullScreenModal} onStartShouldSetResponder={() => true}>
      {children}
    </View>
  );
  return (
    <MyModalContext.Provider
      value={{ isModalVisible, modalContent, showModal, hideModal }}
    >
      {children}
      {isModalVisible && <FullScreenModal>{modalContent}</FullScreenModal>}
    </MyModalContext.Provider>
  );
};
const styles = StyleSheet.create({
  fullScreenModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it covers other components
  },
});
export const useMyModal = () => {
  const context = useContext(MyModalContext);
  if (!context) {
    throw new Error("useMyModal must be used within a MyModalProvider");
  }
  return context;
};

export default ModalProvider;
