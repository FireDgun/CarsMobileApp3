import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import storage from "@react-native-firebase/storage"; // Ensure Firebase Storage is correctly imported
import useUsers from "./hooks/useUsers";
import { uploadImage } from "./utils/FireStorageHelper";
import { months, years } from "./utils/datesHelper";
import { locationOptions } from "./utils/locationsList";
import CustomImagePicker from "./components/CustomImagePicker";

export default function Details({ route, navigation }) {
  const uid = route.params?.uid || "H5GqTwrMdfZfOteMVD5JdBwO4l63"; // the OR statement only for testing
  const phoneNumber = route.params?.phoneNumber || "0511111111"; // the OR statement only for testing
  const { saveDetails } = useUsers();
  const [name, setName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(
        selectedLocations.filter((item) => item !== location)
      );
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleSaveDetails = async () => {
    try {
      await saveDetails(
        uid,
        name,
        selectedMonth,
        selectedYear,
        phoneNumber,
        selectedLocations,
        profilePic,
        navigation
      );
    } catch (error) {
      console.log("Error saving the details :" + error);
    }
  };

  const handleSetProfilePic = (newPic) => {
    setProfilePic(newPic);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#BEBDB8" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 40,
          marginTop: 150,
        }}
      >
        הוסף פרטים
      </Text>
      <TextInput
        style={{
          height: 50,
          width: "100%",
          borderColor: "black",
          borderWidth: 1,
          marginBottom: 30,
          paddingHorizontal: 10,
        }}
        placeholder="שם החברה"
        value={name}
        onChangeText={setName}
      />
      <Text>ממתי אתה עושה הסעות?</Text>

      <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      <View style={{ marginBottom: 20 }}>
        {locationOptions.map((location) => (
          <TouchableOpacity
            key={location}
            onPress={() => toggleLocation(location)}
            style={{
              backgroundColor: selectedLocations.includes(location)
                ? "#841584"
                : "#999",
              padding: 10,
              borderRadius: 5,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>{location}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <CustomImagePicker
        uid={uid}
        folderName={"profile_pics"}
        handleSetState={handleSetProfilePic}
      />

      <TouchableOpacity
        onPress={handleSaveDetails}
        style={{
          backgroundColor: "#841584",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          שמור
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
