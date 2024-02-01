import storage from "@react-native-firebase/storage"; // Ensure Firebase Storage is correctly imported

const uploadImage = async (uri, fileName) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const storageRef = storage().ref(fileName);
  return storageRef
    .put(blob)
    .then(async (snapshot) => {
      try {
        const downloadURL = await storage()
          .ref(snapshot.metadata.fullPath)
          .getDownloadURL();
        console.log("Image uploaded to:", downloadURL);
        return downloadURL; // Return the URL from the inner promise
      } catch (error) {
        console.error("Error getting download URL:", error);
        throw error; // Throw the error to be handled by the caller
      }
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
      throw error; // Throw the error to be handled by the caller
    });
};

export { uploadImage };
