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
const formatTime = (time, label) => {
  if (!time) return label;
  // Get hours and minutes
  let hours = time.getHours();
  let minutes = time.getMinutes();
  // Format hours and minutes to have leading zeros if necessary
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`; // Format to hh:mm
};
export { calculateDaysArray, formatTime };
