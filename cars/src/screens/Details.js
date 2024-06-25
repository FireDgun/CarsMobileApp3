import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { years } from "./../utils/datesHelper";
import { locationOptions } from "./../utils/locationsList";
import CustomImagePicker from "./../components/CustomImagePicker";
import { useUsersContext } from "./../providers/UsersProvider";
import { useAuth } from "./../providers/AuthContext";
import MultiSelectDropdown from "./../components/MultiSelectDropdown";

export default function Details({ route, navigation }) {
  const uid = route.params?.uid;
  // || "H5GqTwrMdfZfOteMVD5JdBwO4l63"; // the OR statement only for testing
  const phoneNumber = route.params?.phoneNumber;
  //  || "0511111111"; // the OR statement only for testing
  const { saveDetails } = useUsersContext();
  const { addDataFromDbToUser } = useAuth();
  const [name, setName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isNameEmpty, setIsNameEmpty] = useState(false);
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
    if (name != "") {
      try {
        await saveDetails(
          uid,
          name,
          selectedMonth,
          selectedYear,
          phoneNumber,
          selectedLocations,
          profilePic ??
            "https://firebasestorage.googleapis.com/v0/b/carsmobileapp-5f072.appspot.com/o/driver.png?alt=media&token=88418939-1372-47c3-912e-79aa3885afbc",
          navigation
        );
        await addDataFromDbToUser(uid);
      } catch (error) {
        console.log("Error saving the details :" + error);
      }
    } else {
      setIsNameEmpty(true);
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
      <CustomImagePicker
        uid={uid}
        folderName={"profile_pics"}
        handleSetState={handleSetProfilePic}
      />
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
        onChangeText={(text) => {
          if (text != "") {
            setIsNameEmpty(false);
          }
          setName(text);
        }}
      />
      <Text>ממתי אתה עושה הסעות?</Text>

      {/* <Picker
        selectedValue={selectedMonth}
        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
      >
        {months.map((month) => (
          <Picker.Item key={month} label={month} value={month} />
        ))}
      </Picker> */}
      <Picker
        selectedValue={selectedYear}
        onValueChange={(itemValue) => setSelectedYear(itemValue)}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year} value={year} />
        ))}
      </Picker>
      <MultiSelectDropdown
        options={locationOptions}
        selectedOptions={selectedLocations}
        setSelectedOptions={setSelectedLocations}
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
      {isNameEmpty && (
        <Text style={{ color: "red", marginBottom: 10 }}>אנא הכנס שם</Text>
      )}
    </ScrollView>
  );
}
