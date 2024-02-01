import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firestore from "@react-native-firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import storage from "@react-native-firebase/storage"; // Ensure Firebase Storage is correctly imported

const locationOptions = [
  "רמת הגולן",
  "טבריה ועמק הירדן",
  "בית שאן והסביבה",
  "אזור יוקנעם",
  "הגליל העליון", // Add the rest of your options...
];

export default function Details({ route, navigation }) {
  const uid = route.params?.uid || "H5GqTwrMdfZfOteMVD5JdBwO4l63";
  const phoneNumber = route.params?.phoneNumber || "0511111111";

  const [name, setName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const [selectedLocations, setSelectedLocations] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  console.log(uid);

  const toggleLocation = (location) => {
    if (selectedLocations.includes(location)) {
      setSelectedLocations(
        selectedLocations.filter((item) => item !== location)
      );
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };
  const uploadImage = async (uri, fileName) => {
    const response = await fetch(uri);
    const blob = await response.blob(); // Convert the fetched URI to a blob

    const storageRef = storage().ref(fileName); // Create a reference to Firebase Storage
    storageRef
      .put(blob)
      .then(async (snapshot) => {
        try {
          const downloadURL = await storage()
            .ref(snapshot.metadata.fullPath)
            .getDownloadURL();
          console.log("Image uploaded to:", downloadURL);
          setProfilePic(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      // Assuming result.assets[0].uri contains the file URI
      const uploadUri = result.assets[0].uri;
      const fileName = `profile_pics/${uid}.jpg`; // Construct a file name or path as needed
      uploadImage(uploadUri, fileName);
    }
  };

  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 75 }, (_, i) =>
    (currentYear - i).toString()
  );

  const saveDetails = async () => {
    try {
      await firestore()
        .collection("users")
        .doc(uid)
        .set({
          name,
          dob: `${selectedMonth}/${selectedYear}`, // Store DOB as "month/year"
          phoneNumber,
          selectedLocations, // Store selected locations
          profilePic,
        });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error saving the details :" + error);
    }
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
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "#999",
          padding: 10,
          borderRadius: 5,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
          העלה תמונת פרופיל
        </Text>
      </TouchableOpacity>
      {profilePic && (
        <Image
          source={{ uri: profilePic }}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      )}
      <TouchableOpacity
        onPress={saveDetails}
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
