import { TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const calculateDaysArray = (formData) => {
  let daysArray = [];
  let currentDay = new Date(formData.date);
  let endDate = new Date(formData.endDate);
  if (formData.endDate) {
    while (currentDay <= endDate) {
      daysArray.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
  } else {
    daysArray.push(new Date(currentDay));
  }
  return daysArray;
};
const formatTime = (timeObject, label = "") => {
  if (!timeObject) return label;
  // Get hours and minutes
  let time = new Date(timeObject.toString());
  let hours = time.getHours();
  let minutes = time.getMinutes();
  // Format hours and minutes to have leading zeros if necessary
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`; // Format to hh:mm
};

const getRideTypeHebrewName = (type) => {
  switch (type) {
    case "tripRide":
      return "נסיעה צמודה";
    case "oneTimeLine":
      return "ביצוע קו חד פעמי";
    case "lineRide":
      return "קו קבוע";
    case "jumpOneWay":
      return "הקפצה כיוון אחד";
    case "jumpTwoWay":
      return "הקפצה הלוך וחזור";
    case "airportArrival":
      return 'נתב"ג נחיתה';
    case "airportDeparture":
      return 'נסיעה לנתב"ג';
    case "airportBoth":
      return 'נתב"ג הלוך וחזור';
    default:
      return type;
  }
};
const getRideTypeEnglishName = (hebrewName) => {
  switch (hebrewName) {
    case "נסיעה צמודה":
      return "tripRide";
    case "ביצוע קו חד פעמי":
      return "oneTimeLine";
    case "קו קבוע":
      return "lineRide";
    case "הקפצה כיוון אחד":
      return "jumpOneWay";
    case "הקפצה הלוך וחזור":
      return "jumpTwoWay";
    case 'נתב"ג נחיתה':
      return "airportArrival";
    case 'נסיעה לנתב"ג':
      return "airportDeparture";
    case 'נתב"ג הלוך וחזור':
      return "airportBoth";
    default:
      return hebrewName; // or any default value you see fit
  }
};

const formatDate = (dateString) => {
  return dateString
    ? new Date(dateString).toLocaleDateString("he-IL")
    : "לא צוין";
};

const formatAddress = (address, isClosedRide = false) => {
  if (isClosedRide) {
    return address ? address.fullAddressName : "לא ידוע";
  }
  return address ? address.addressName : "לא ידוע";
};

const buildRideFullAddressesText = (ride, specificNotes) => {
  let {
    type,
    destination,
    origin,
    stops,
    tripLocations,
    flightNumber,
    flightNumberReturn,
    stopsReturn,
    // Additional fields for airport rides not explicitly listed but handled below
  } = ride;
  type = getRideTypeEnglishName(type);
  typeHebrew = getRideTypeHebrewName(type);
  let rideDetails = [];

  const airport = 'נתב"ג';

  if (typeHebrew.includes('נתב"ג')) {
    if (typeHebrew === 'נתב"ג נחיתה') {
      originDestinationDisplay = `ל${ride.destination.fullAddressName}`;
    }
    if (typeHebrew === 'נסיעה לנתב"ג') {
      originDestinationDisplay = `מ${ride.origin.fullAddressName}`;
    }
    if (typeHebrew === 'נתב"ג הלוך וחזור') {
      originDestinationDisplay = `מ${ride.origin.fullAddressName} ל${airport} וחזור ל${ride.destination.fullAddressName}`;
    }
    rideDetails.push({ label: "", value: originDestinationDisplay });
  } else {
    if (origin && origin.fullAddressName) {
      rideDetails.push({ label: "מוצא", value: origin.fullAddressName });
    }
    if (destination && destination.fullAddressName) {
      rideDetails.push({ label: "יעד", value: destination.fullAddressName });
    }
  }

  if (stops.length > 0) {
    rideDetails.push({ label: "עצירות בדרך", value: "" });
    stops.forEach((stop, index) => {
      rideDetails.push({
        label: `עצירה ${index + 1}`,
        value: stop.fullAddressName,
      });
    });
  }

  if (stopsReturn.length > 0) {
    rideDetails.push({ label: "עצירות בדרך חזור", value: "" });
    stopsReturn.forEach((stop, index) => {
      rideDetails.push({
        label: `עצירה ${index + 1}`,
        value: stop.fullAddressName,
      });
    });
  }
  if (tripLocations && tripLocations.length > 0 && type === "tripRide") {
    tripLocations.forEach((location, index) => {
      if (location.origin != "") {
        rideDetails.push({ label: "", value: "" });

        rideDetails.push({
          label: `מסלול יום ${index + 1}`,
          value: `מ-${location.origin.fullAddressName} אל ${
            location.destination.fullAddressName
          } \nמשעה ${formatTime(location.startTime)} עד שעה ${formatTime(
            location.endTime
          )}`,
        });
        if (location.stops?.length > 0) {
          location.stops.forEach((stop, index) => {
            rideDetails.push({
              label: `עצירה ${index + 1}`,
              value: stop.fullAddressName,
            });
          });
        }
      }
    });
  }
  if (flightNumber) {
    rideDetails.push({ label: "מספר טיסה", value: flightNumber });
  }
  if (flightNumberReturn) {
    rideDetails.push({ label: "מספר טיסה חזור", value: flightNumberReturn });
  }

  rideDetails.push({
    label: "פרטים נוספים",
    value: specificNotes == "" ? "אין" : specificNotes,
  });

  let textResult = rideDetails
    .map((detail) => `${detail.label}: ${detail.value}`)
    .join("\n");
  return textResult;
};

const buildRidePostView = (ride, setShowStopsModal, setStopsToDisplay) => {
  let {
    type,
    date,
    destination,
    origin,
    stops,
    startTime,
    endTime,
    notes,
    numberOfPassengers,
    paymentMethod,
    price,
    specialOption,
    frequency,
    returnFrequency,
    tripLocations,
    flightNumber,
    numberOfSuitcases,
    flightNumberReturn,
    numberOfSuitcasesReturn,
    endDate,
    stopsReturn,
    // Additional fields for airport rides not explicitly listed but handled below
  } = ride;
  type = getRideTypeEnglishName(type);
  let rideDetails = [
    {
      label:
        tripLocations.length > 1 || type == "lineRide"
          ? "תאריך התחלה"
          : "תאריך",
      value: formatDate(date),
    },
  ];
  if (tripLocations.length > 1) {
    rideDetails.push({
      label: "תאריך סיום",
      value: formatDate(endDate),
    });
  }

  rideDetails.push({
    label: "מספר נוסעים",
    value: numberOfPassengers.toString(),
  });
  // Handling address-based fields (origin, destination) and special cases for airport rides
  if (origin && origin.addressName) {
    rideDetails.push({ label: "מוצא", value: formatAddress(origin) });
  }
  const airport = 'נתב"ג';

  if (type.startsWith("airport")) {
    if (type === "airportArrival") {
      rideDetails.push({ label: "מוצא", value: airport });
    }
    if (type === "airportDeparture") {
      rideDetails.push({ label: "יעד", value: airport });
    }
    if (type === "airportBoth") {
      rideDetails.push({ label: "יעד", value: airport });
    }
  }
  if (stops.length > 0 && type === "airportBoth") {
    rideDetails.push({
      label: "עצירות בדרך",
      value: (
        <TouchableOpacity
          onPress={() => {
            setShowStopsModal(true);
            setStopsToDisplay(stops);
          }}
        >
          <Text>{stops.length} (לחץ לפרטים)</Text>
        </TouchableOpacity>
      ),
    });
  }
  if (type === "airportBoth") {
    if (startTime) {
      rideDetails.push({
        label: "שעת התייצבות",
        value: formatTime(startTime),
      });
    }

    if (numberOfSuitcases) {
      rideDetails.push({
        value: <MaterialIcons name="luggage" size={24} color="black" />,
        label: numberOfSuitcases,
      });
    }

    rideDetails.push({ label: "", value: "" });

    rideDetails.push({ label: "פרטי חזור", value: "" });

    rideDetails.push({ label: "תאריך חזור", value: formatDate(endDate) });

    rideDetails.push({ label: "מוצא", value: airport });
  }
  if (destination && destination.addressName) {
    rideDetails.push({ label: "יעד", value: formatAddress(destination) });
  }
  if (stops.length > 0 && type !== "airportBoth") {
    rideDetails.push({
      label: "עצירות בדרך",
      value: (
        <TouchableOpacity
          onPress={() => {
            setShowStopsModal(true);
            setStopsToDisplay(stops);
          }}
        >
          <Text>{stops.length} (לחץ לפרטים)</Text>
        </TouchableOpacity>
      ),
    });
  }
  if (stopsReturn.length > 0 && type === "airportBoth") {
    rideDetails.push({
      label: "עצירות בדרך",
      value: (
        <TouchableOpacity
          onPress={() => {
            setShowStopsModal(true);
            setStopsToDisplay(stopsReturn);
          }}
        >
          <Text>{stopsReturn.length} (לחץ לפרטים)</Text>
        </TouchableOpacity>
      ),
    });
  }
  // Handling time and frequency
  if (startTime && type != "airportBoth") {
    rideDetails.push({ label: "שעת התייצבות", value: formatTime(startTime) });
  }
  if (frequency) {
    rideDetails.push({ label: "ימי איסוף", value: frequency });
  }
  if (type === "lineRide") {
    rideDetails.push({ label: "", value: "" });
  }

  if (endTime) {
    rideDetails.push({ label: "שעת חזור", value: formatTime(endTime) });
  }
  if (returnFrequency) {
    rideDetails.push({ label: "ימי פיזור", value: returnFrequency });
  }
  if (numberOfSuitcasesReturn) {
    rideDetails.push({
      value: <MaterialIcons name="luggage" size={24} color="black" />,
      label: numberOfSuitcasesReturn,
    });
  }

  // Special options and notes
  if (specialOption && specialOption.length) {
    rideDetails.push({
      label: "דרישות מיוחדת",
      value: specialOption.join(", "),
    });
  }
  if (notes) {
    rideDetails.push({ label: "הערות", value: notes });
  }

  // Handling tripLocations for relevant ride types
  if (tripLocations && tripLocations.length > 0 && type === "tripRide") {
    tripLocations.forEach((location, index) => {
      if (location.origin != "") {
        rideDetails.push({ label: "", value: "" });

        rideDetails.push({
          label: `מסלול יום ${index + 1}`,
          value: `מ-${formatAddress(location.origin)} אל ${formatAddress(
            location.destination
          )} \nמשעה ${formatTime(location.startTime)} עד שעה ${formatTime(
            location.endTime
          )}`,
        });
        if (location.stops?.length > 0) {
          rideDetails.push({
            label: "עצירות בדרך",
            value: (
              <TouchableOpacity
                onPress={() => {
                  setShowStopsModal(true);
                  setStopsToDisplay(location.stops);
                }}
              >
                <Text>{location.stops.length} (לחץ לפרטים)</Text>
              </TouchableOpacity>
            ),
          });
        }
      }
    });
  }
  rideDetails.push({ label: "", value: "" });

  rideDetails.push(
    { label: "שיטת תשלום", value: paymentMethod },
    { label: "מחיר", value: `${price}₪` }
  );
  // Render the details
  return rideDetails;
};

const initialRideObject = {
  type: "",
  date: null,
  endDate: null,
  startTime: null,
  endTime: null,
  origin: "",
  destination: "",

  stops: [],
  stopsReturn: [],
  tripLocations: [
    {
      origin: "",
      destination: "",
      endAt: "origin", // "destination" or "origin"
      stops: [],
      startTime: null,
      endTime: null,
    },
  ],
  numberOfPassengers: "",
  price: "",
  paymentMethod: "מזומן מהלקוח",
  specialOption: [],
  notes: "",
  notesForLater: "",
  flightNumber: null,
  numberOfSuitcases: null,
  flightNumberReturn: null,
  numberOfSuitcasesReturn: null,
  frequency: "",
  returnFrequency: "",
  interestedUsers: [],
  rideBuyer: null,
  openForOffers: true,
};

const flashRide = (ride) => {
  const negotiations = [];
  const newRide = JSON.parse(JSON.stringify(ride));
  for (const property in newRide) {
    if (
      !initialRideObject.hasOwnProperty(property) &&
      newRide[property].hasOwnProperty("messages")
    ) {
      negotiations.push({ senderId: property, ...newRide[property] });
      delete newRide[property];
    }
  }
  newRide.negotiations = negotiations;
  return newRide;
};

// Create Enum for ride message types
const RideMessageType = {
  CONTRACTOR_SEND: "Contractor - Send",
  CONTRACTOR_SEND_DETAILS: "Contractor - Send Details",
  CONTRACTOR_OFFER_PRICE: "Contractor - Offer Price X",
  CONTRACTOR_FINALIZE: "Contractor - Finalize",
  CONTRACTOR_REJECT: "Contractor - Reject",
  CONTRACTOR_ADDITIONAL_QUESTION: "Contractor - Additional Question",
  PUBLISHER_APPROVED: "Publisher - Approved",
  PUBLISHER_SEND_DETAILS: "Publisher - Send Additional Details",
  PUBLISHER_OFFER_PRICE: "Publisher - Offer Price X",
  PUBLISHER_RESPONSE_QUESTION: "Publisher - Response to Question",
  PUBLISHER_REJECT: "Publisher - Reject",
  PUBLISHER_TIMEOUT: "Publisher - Timeout",
};

const getRideMessageTextByType = (type, suggestPrice, question) => {
  const formattedPrice = new Intl.NumberFormat("he-IL").format(suggestPrice);
  switch (type) {
    case RideMessageType.CONTRACTOR_SEND:
      return "שלח, מתאים לי";
    case RideMessageType.CONTRACTOR_SEND_DETAILS:
      return "שלח פרטים נוספים";
    case RideMessageType.CONTRACTOR_OFFER_PRICE:
      return "מעוניין, במחיר " + formattedPrice + "₪ לא כולל מעמ";
    case RideMessageType.CONTRACTOR_FINALIZE:
      return "סגור!";
    case RideMessageType.CONTRACTOR_ADDITIONAL_QUESTION:
      return "שאלה נוספת \n" + question;
    case RideMessageType.PUBLISHER_APPROVED:
      return "מבחינתי מאושר";
    case RideMessageType.PUBLISHER_SEND_DETAILS:
      return "כתובות מדויקות";
    case RideMessageType.PUBLISHER_OFFER_PRICE:
      return "מציע " + formattedPrice + "₪ לא כולל מעמ";
    case RideMessageType.PUBLISHER_RESPONSE_QUESTION:
      return "תשובה לשאלה \n" + question;
    case RideMessageType.PUBLISHER_REJECT:
      return "מבטל את ההצעה";
    case RideMessageType.PUBLISHER_TIMEOUT:
      return "נגמר הזמן - נסה לשלוח שוב אם הנסיעה עדיין פתוחה";
    case RideMessageType.CONTRACTOR_REJECT:
      return "מבטל את ההצעה";

    default:
      return "הודעה";
  }
};
const extractPriceFromMessage = (message) => {
  const pricePattern = /(\d{1,3}(,\d{3})*)(?=₪)/; // RegEx to match the price pattern
  const match = message.match(pricePattern);
  return match ? parseInt(match[0].replace(/,/g, ""), 10) : null; // Remove commas and convert to integer
};
const extractLastPriceFromMessagesArray = (messagesArray, defaultPrice) => {
  // Iterate through the messages array from the end to find the last mentioned price
  for (let i = messagesArray.length - 1; i >= 0; i--) {
    const price = extractPriceFromMessage(messagesArray[i]);
    if (price !== null) {
      return price; // Return the last found price
    }
  }

  return defaultPrice; // Return defaultPrice if no price is found in any message
};

const buildSecondaryDetails = (
  ride,
  setShowStopsModal,
  setStopsToDisplay,
  closeRide
) => {
  const {
    numberOfPassengers,
    paymentMethod,
    price,
    specialOption,
    notes,
    frequency,
    returnFrequency,
    numberOfSuitcases,
    numberOfSuitcasesReturn,
    stops,
    stopsReturn,
    flightNumber,
    flightNumberReturn,
  } = ride;

  let secondaryDetails = [];
  if (stops && stops.length > 0) {
    secondaryDetails.push({
      label: "עצירות בדרך",
      value: (
        <TouchableOpacity
          onPress={() => {
            setShowStopsModal(true);
            setStopsToDisplay(stops);
          }}
        >
          <Text>{stops.length} (לחץ לפרטים)</Text>
        </TouchableOpacity>
      ),
    });
  }

  if (stopsReturn && stopsReturn.length > 0) {
    secondaryDetails.push({
      label: "עצירות בדרך חזור",
      value: (
        <TouchableOpacity
          onPress={() => {
            setShowStopsModal(true);
            setStopsToDisplay(stopsReturn);
          }}
        >
          <Text>{stopsReturn.length} (לחץ לפרטים)</Text>
        </TouchableOpacity>
      ),
    });
  }

  // Passengers, Payment, and Price
  if (numberOfPassengers) {
    secondaryDetails.push(`נוסעים: ${numberOfPassengers}`);
  }
  if (paymentMethod) {
    secondaryDetails.push(`תשלום: ${paymentMethod}`);
  }
  if (price) {
    secondaryDetails.push(`מחיר: ${price}₪`);
  }

  // Special Options and Notes
  if (specialOption && specialOption.length) {
    secondaryDetails.push(`בקשות מיוחדות: ${specialOption.join(", ")}`);
  }
  if (notes) {
    secondaryDetails.push(`הערות: ${notes}`);
  }

  // Frequency and Suitcases
  if (frequency) {
    secondaryDetails.push(`ימי איסוף: ${frequency}`);
  }
  if (returnFrequency) {
    secondaryDetails.push(`ימי פיזור: ${returnFrequency}`);
  }
  if (numberOfSuitcases || numberOfSuitcasesReturn) {
    secondaryDetails.push(`מזוודות: ${numberOfSuitcases || 0}`);
  }
  if (closeRide) {
    if (flightNumber) {
      secondaryDetails.push(`מספר טיסה: ${flightNumber}`);
    }
    if (flightNumberReturn) {
      secondaryDetails.push(`מספר טיסה חזור: ${flightNumberReturn}`);
    }
  }
  return secondaryDetails;
};

const buildRideRowView = (
  ride,
  setShowStopsModal,
  setStopsToDisplay,
  closeRide
) => {
  const {
    type,
    date,
    destination,
    origin,
    startTime,
    endTime,
    tripLocations,
    endDate,
  } = ride;

  // Main section details
  const mainDetails = [];
  const airport = 'נתב"ג';
  mainDetails.push("תאריך: " + formatDate(date));

  if (endDate) {
    if (type === 'נתב"ג הלוך וחזור') {
      mainDetails.push("תאריך חזור: " + formatDate(endDate));
    }
    if (type == "נסיעה צמודה") {
      mainDetails.push("תאריך סיום: " + formatDate(endDate));
    }
  }

  mainDetails.push(`${type}`);
  if (type == "ביצוע קו חד פעמי" && endTime) {
    mainDetails.push(`הלוך וחזור`);
  }

  // Type, Date & Time
  if (type !== "נסיעה צמודה") {
    if (type === 'נתב"ג הלוך וחזור') {
      mainDetails.push(`שעת איסוף ${formatTime(startTime)} `);
      mainDetails.push(`שעת נחיתה ${formatTime(endTime)}`);
    } else if (endTime) {
      mainDetails.push(`${formatTime(startTime)} - ${formatTime(endTime)}`);
    } else {
      mainDetails.push(formatTime(startTime));
    }
  }

  // Origin and Destination
  let originDestinationDisplay = "";
  if (type.includes('נתב"ג')) {
    if (type === 'נתב"ג נחיתה') {
      originDestinationDisplay = `ל${formatAddress(destination, closeRide)}`;
    }
    if (type === 'נסיעה לנתב"ג') {
      originDestinationDisplay = `מ${formatAddress(origin, closeRide)}`;
    }
    if (type === 'נתב"ג הלוך וחזור') {
      originDestinationDisplay = `מ${formatAddress(
        origin,
        closeRide
      )} ל${airport} וחזור ל${formatAddress(destination, closeRide)}`;
    }
  } else {
    if (
      tripLocations &&
      tripLocations.length > 0 &&
      ride.type === "נסיעה צמודה"
    ) {
      originDestinationDisplay = `${
        tripLocations.length
      } ימי טיול:\n מתחיל מ${formatAddress(
        tripLocations[0].origin,
        closeRide
      )} ב${formatTime(tripLocations[0].startTime)}`;
    } else {
      originDestinationDisplay = `מ${
        origin && origin.addressName ? formatAddress(origin, closeRide) : "N/A"
      } ל${
        destination && destination.addressName
          ? formatAddress(destination, closeRide)
          : "N/A"
      }`;
    }
  }
  mainDetails.push(originDestinationDisplay);

  // Secondary section details
  const secondaryDetails = buildSecondaryDetails(
    ride,
    setShowStopsModal,
    setStopsToDisplay,
    closeRide
  );

  // Combining main and secondary details
  return { mainDetails, secondaryDetails };
};

export {
  calculateDaysArray,
  formatTime,
  getRideTypeHebrewName,
  buildRidePostView,
  formatDate,
  formatAddress,
  initialRideObject,
  RideMessageType,
  getRideMessageTextByType,
  buildRideRowView,
  flashRide,
  buildRideFullAddressesText,
  extractPriceFromMessage,
  extractLastPriceFromMessagesArray,
};
