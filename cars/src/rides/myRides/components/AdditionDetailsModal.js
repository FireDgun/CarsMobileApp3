import { View, Text, Modal, TextInput, Button } from "react-native";
import React, { useState } from "react";

const AdditionDetailsModal = ({ setAdditionalDetailsModalVisible, ride }) => {
  const [origin, setOrigin] = useState(ride.origin.fullAddressName);
  const [destination, setDestination] = useState(
    ride.destination.fullAddressName
  );
  const [flightNumber, setFlightNumber] = useState(ride.flightNumber);
  const [returnFlightNumber, setReturnFlightNumber] = useState(
    ride.flightNumberReturn
  );
  const [notes, setNotes] = useState(ride.notes);

  const handleSend = () => {
    // Logic to send the data
    // You can access the field values using the state variables (origin, destination, flightNumber, returnFlightNumber, notes)
  };

  return (
    <Modal onRequestClose={() => setAdditionalDetailsModalVisible(false)}>
      <View>
        <Text>AdditionDetailsModal</Text>
        <TextInput
          value={origin}
          onChangeText={setOrigin}
          placeholder="Origin"
        />
        <TextInput
          value={destination}
          onChangeText={setDestination}
          placeholder="Destination"
        />
        {flightNumber && (
          <TextInput
            value={flightNumber}
            onChangeText={setFlightNumber}
            placeholder="Flight Number"
          />
        )}
        {returnFlightNumber && (
          <TextInput
            value={returnFlightNumber}
            onChangeText={setReturnFlightNumber}
            placeholder="Return Flight Number"
          />
        )}
        <TextInput value={notes} onChangeText={setNotes} placeholder="Notes" />
        <Button title="Send" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default AdditionDetailsModal;
