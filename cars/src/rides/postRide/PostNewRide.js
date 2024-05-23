import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import PostAirportRide from "./airport/PostAirportRide";
import PostJumpRide from "./jumps/PostJumpRide";
import PostLineRide from "./lines/PostLineRide";
import PostTripRide from "./trip/PostTripRide";
import { ScrollView } from "react-native-gesture-handler";

const PostNewRide = () => {
  const bottomSheetRef = useRef(null);
  const [selectedRide, setSelectedRide] = useState("PostJumpRide");
  const backgroundOpacity = useMemo(() => new Animated.Value(0), []);

  // Function to handle changes in bottom sheet's snap point
  const handleSheetChanges = (index) => {
    Animated.timing(backgroundOpacity, {
      toValue: index > 0 ? 0.5 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderRideComponent = () => {
    switch (selectedRide) {
      case "PostTripRide":
        return <PostTripRide />;
      case "PostLineRide":
        return <PostLineRide />;
      case "PostJumpRide":
        return <PostJumpRide />;
      case "PostAirportRide":
        return <PostAirportRide />;
      default:
        return <Text>Select a ride type from the bottom.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlay, { opacity: backgroundOpacity }]} />
      <Text style={styles.title}>בחר סוג נסיעה</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRide === "PostJumpRide" ? styles.activeButton : {},
          ]}
          onPress={() => setSelectedRide("PostJumpRide")}
        >
          <MaterialIcons
            name="directions-bus"
            size={24}
            color={selectedRide === "PostJumpRide" ? "#FFFFFF" : "#000"}
          />
          <Text style={styles.buttonText}>הקפצה</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRide === "PostTripRide" ? styles.activeButton : {},
          ]}
          onPress={() => setSelectedRide("PostTripRide")}
        >
          <MaterialIcons
            name="departure-board"
            size={24}
            color={selectedRide === "PostTripRide" ? "#FFFFFF" : "#000"}
          />
          <Text style={styles.buttonText}>צמוד</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRide === "PostAirportRide" ? styles.activeButton : {},
          ]}
          onPress={() => setSelectedRide("PostAirportRide")}
        >
          <MaterialIcons
            name="local-airport"
            size={24}
            color={selectedRide === "PostAirportRide" ? "#FFFFFF" : "#000"}
          />
          <Text style={styles.buttonText}>נתב"ג</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedRide === "PostLineRide" ? styles.activeButton : {},
          ]}
          onPress={() => setSelectedRide("PostLineRide")}
        >
          <MaterialIcons
            name="rv-hookup"
            size={24}
            color={selectedRide === "PostLineRide" ? "#FFFFFF" : "#000"}
          />
          <Text style={styles.buttonText}>קווים</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={["20%", "50%", "90%"]}
        onChange={handleSheetChanges}
        enableOverDrag={false} // Prevent over-dragging
        enablePanDownToClose={false} // Prevent closing by dragging down
      >
        <View style={styles.sheetContent}>
          <ScrollView>{renderRideComponent()}</ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

export default PostNewRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    height: 80,
    width: 80,
  },
  buttonText: {
    marginLeft: 5,
    color: "#000",
  },
  activeButton: {
    backgroundColor: "#3f51b5",
    color: "#FFFFFF",
  },
  sheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
