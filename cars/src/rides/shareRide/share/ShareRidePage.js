import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRidesContext } from "../../../providers/RidesContext";
import RidePreview from "../preview/RidePreview";
import { initialRideObject } from "../../../utils/ridesHelper";
import UsersChatsSelection from "./UsersChatsSelection";
import { useChatsContext } from "../../../providers/ChatsProvider";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../providers/AuthContext";
const ShareRidePage = ({ route }) => {
  const rideId = route?.params?.rideId;
  const [selectedItems, setSelectedItems] = useState([]);
  const { user } = useAuth();

  console.log(selectedItems);
  const { allRides } = useRidesContext();
  const [ride, setRide] = useState(initialRideObject);
  const [showPreview, setShowPreview] = useState(false);
  const { sendMessage, createChat } = useChatsContext();
  const navigation = useNavigation();
  const handleConfirm = async () => {
    console.log("Send ride " + ride);
    console.log(selectedItems);
    for (const item of selectedItems) {
      if (item.category === "user") {
        const chatId = await createChat(user.uid, item.id);
        sendMessage(chatId, { text: JSON.stringify(ride) }, "ride");
      } else {
        sendMessage(item.id, { text: JSON.stringify(ride) }, "ride");
      }
    }
    navigation.navigate("Dashboard", { initialPage: "rides" });
  };
  useEffect(() => {
    setRide(allRides.find((r) => r.id === rideId));
  }, [allRides, rideId]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setShowPreview(!showPreview)}
          style={[styles.button, styles.toggleButton]}
        >
          <Text style={styles.buttonText}>
            {showPreview ? "הסתר" : "תצוגה מקדימה"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConfirm}
          style={[styles.button, styles.confirmButton]}
        >
          <Text style={styles.buttonText}>אישור</Text>
        </TouchableOpacity>
      </View>
      {showPreview ? <RidePreview ride={ride} /> : null}
      <UsersChatsSelection
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  toggleButton: {
    marginBottom: 10,
    alignSelf: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: 100,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#34C759", // Green color for confirmation
  },
  // Add or adjust styles as needed
});

export default ShareRidePage;
