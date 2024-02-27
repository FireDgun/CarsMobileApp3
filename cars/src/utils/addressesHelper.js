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
