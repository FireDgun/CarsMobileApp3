const months = Array.from({ length: 12 }, (_, i) =>
  (i + 1).toString().padStart(2, "0")
);
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 75 }, (_, i) =>
  (currentYear - i).toString()
);

export { months, currentYear, years };
