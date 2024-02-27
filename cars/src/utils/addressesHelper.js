export function translateCityName(abbreviation) {
  switch (abbreviation) {
    case 'ק"ג':
      return "קריית גת";
    case 'ק"ש':
      return "קריית שמונה";
    case 'כ"ס':
      return "כפר סבא";
    case 'פ"ת':
      return "פתח תקווה";
    case 'ר"ג':
      return "רמת גן";
    case 'ת"א':
      return "תל אביב";
    default:
      return abbreviation; // Return the original abbreviation if it doesn't match any case
  }
}

export function removeAddressFromJson(jsonString) {
  // This regex looks for "Address" followed by any amount of whitespace, a colon, any amount of whitespace,
  // then a double-quoted string that can contain any characters (including commas), and finally the closing quote.
  // It uses a non-greedy match to ensure it stops at the first closing quote it encounters after "Address":
  var regex = /"Address"\s*:\s*"[^"]*?"(?=,|\})/g;

  // Remove "Address" properties. This step handles most cases correctly.
  var modifiedJson = jsonString.replace(regex, "");

  // To clean up potential trailing commas left when "Address" was the last property before a closing brace,
  // or leading commas if "Address" was the first property, additional cleanup is needed:
  modifiedJson = modifiedJson.replace(/,\s*}/g, "}"); // Handle trailing commas
  modifiedJson = modifiedJson.replace(/{,\s*/g, "{"); // Handle leading commas
  modifiedJson = modifiedJson.replace(/,,/g, ","); // Handle any consecutive commas as a side effect

  // Edge case: If the entire JSON starts with "{," or ends with ",}", those commas should be removed.
  // This is a rare edge case and might not be necessary depending on your JSON structure.
  modifiedJson = modifiedJson.replace(/^\{,/, "{");
  modifiedJson = modifiedJson.replace(/,\}$/, "}");

  return modifiedJson;
}
