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
  }
};

export { calculateDaysArray, formatTime, getRideTypeHebrewName };
