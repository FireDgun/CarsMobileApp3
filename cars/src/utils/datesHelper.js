const months = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 75 }, (_, i) =>
  (currentYear - i).toString()
);

const formatDateInHebrew = (date) => {
  // Check if the date is not the default "1.1.1970"
  if (date.getTime() !== new Date("1970-01-01T00:00:00Z").getTime()) {
    // Format the date in Hebrew
    return new Intl.DateTimeFormat("he-IL", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(date);
  }
  return ""; // Return an empty string or any placeholder if it's the default date
};

export { months, currentYear, years, formatDateInHebrew };
