import { useState } from "react";
import { initialRideObject } from "../utils/ridesHelper";

export default function usePostRide() {
  const [formData, setFormData] = useState(initialRideObject);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSpecialOptionChange = (value) => {
    setFormData((prevFormData) => {
      const exists = prevFormData.specialOption.includes(value);
      const newSpecialOption = exists
        ? prevFormData.specialOption.filter((item) => item !== value)
        : [...prevFormData.specialOption, value];

      return {
        ...prevFormData,
        specialOption: newSpecialOption,
      };
    });
  };

  const handleUpdateTripData = (data, index, originOrDestination) => {
    let newTripLocations = formData.tripLocations;
    newTripLocations[index][originOrDestination] = data;
    setFormData((prev) => ({
      ...prev,
      tripLocations: newTripLocations,
    }));
  };

  return {
    formData,
    handleInputChange,
    handleSpecialOptionChange,
    handleUpdateTripData,
    setFormData,
  };
}
