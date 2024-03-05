import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const CustomCheckbox = ({ isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.checkboxBase}>
    {isSelected && <View style={styles.checkboxCheck} />}
  </TouchableOpacity>
);

export default function MultiSelectDropdown({
  options,
  selectedOptions,
  setSelectedOptions,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSelection = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selected) => selected !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  console.log(modalVisible);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdownButton}
      >
        <Text>איזור פעילות</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <ScrollView>
                  {options.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => toggleSelection(option)}
                      style={styles.optionRow}
                    >
                      <CustomCheckbox
                        isSelected={selectedOptions.includes(option)}
                        onPress={() => toggleSelection(option)}
                      />
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <Button title="שמור" onPress={() => setModalVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#ddd",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent background
  },
  modalView: {
    maxHeight: "80%", // Set a maximum height for the modal
    width: "90%", // You might want to adjust the width as well
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10, // Optional: Adds rounded corners to the modal
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 8,
  },
  checkboxCheck: {
    width: 12,
    height: 12,
    backgroundColor: "#000",
  },
  optionText: {
    fontSize: 16,
  },
});
