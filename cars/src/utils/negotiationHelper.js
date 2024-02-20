import { RideMessageType } from "./ridesHelper";

const getNegotiationButtonText = (message, rideOwner = true) => {
  if (message.type == RideMessageType.PUBLISHER_APPROVED) {
    return "ממתין לאישור סופי";
  } else if (
    message.type == RideMessageType.CONTRACTOR_OFFER_PRICE ||
    message.type == RideMessageType.PUBLISHER_OFFER_PRICE
  ) {
    return "הצע מחיר";
  } else if (rideOwner) {
    if (
      message.type == RideMessageType.CONTRACTOR_SEND ||
      message.type == RideMessageType.CONTRACTOR_OFFER_PRICE
    ) {
      return "קבל את ההצעה\nשלח לאישור סופי";
    } else if (message.type == RideMessageType.CONTRACTOR_APPROVED) {
      return "אישור סופי";
    }
  }
};
