const fixPhoneFormat = (phoneNumber) => {
  let number = phoneNumber;
  number = number.replace(/[\s-]/g, "");
  // Replace +972 with 0
  if (number.startsWith("+972")) {
    number = "0" + number.slice(4);
  }
  return number;
};

export { fixPhoneFormat };
