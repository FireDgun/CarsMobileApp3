const fixPhoneFormat = (phoneNumber) => {
  try {
    let number = phoneNumber;
    if (!number) return 0;
    number = number.replace(/[\s-]/g, "");
    // Replace +972 with 0
    if (number.startsWith("+972")) {
      number = "0" + number.slice(4);
    }
    return number;
  } catch (err) {
    console.log(err);
    return 0;
  }
};

export { fixPhoneFormat };
