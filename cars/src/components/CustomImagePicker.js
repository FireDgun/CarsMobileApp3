import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { uploadImage } from "../utils/FireStorageHelper";
import * as ImagePicker from "expo-image-picker";

const CustomImagePicker = ({ folderName, uid, handleSetState }) => {
  const [photo, setPhoto] = useState();

  useEffect(() => {
    handleSetState(photo);
  }, [photo]);

  const handleUploadImage = async (uri, fileName) => {
    try {
      let downloadUrl = await uploadImage(uri, fileName);
      setPhoto(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
      const fileName = `${folderName}/${uid}.jpg`; // Construct a file name or path as needed
      handleUploadImage(uploadUri, fileName);
    }
  };

  return (
    <>
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
      {photo && (
        <Image
          source={{ uri: photo }}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
      )}
    </>
  );
};

export default CustomImagePicker;
