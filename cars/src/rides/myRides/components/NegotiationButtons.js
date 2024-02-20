import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRidesContext } from "../../../providers/RidesContext";
import { useAuth } from "../../../providers/AuthContext";
import WaitingForResponse from "./WaitingForResponse";

//need to finish this component
const NegotiationButtons = ({ messages, senderId }) => {
  const type = messages[messages.length - 1].type;
  const { sendMessageInNegotiation } = useRidesContext();
  const { user } = useAuth();
  if (user.uid === senderId) {
    if (type === "Contractor") {
      return <WaitingForResponse isLoading={true} />;
    }
    return (
      <View>
        <TouchableOpacity>
          <Text>הצע מחיר</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>שלח</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>שלח פרטים נוספים</Text>
        </TouchableOpacity>
        <Text>NegotiationButtons</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>NegotiationButtons</Text>
    </View>
  );
};

export default NegotiationButtons;
