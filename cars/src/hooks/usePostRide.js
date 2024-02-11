import { useState } from "react";

export default function usePostRide() {
  const [formData, setFormData] = useState({
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
    flightNumber: null,
    numberOfSuitcases: null,
    flightNumberReturn: null,
    numberOfSuitcasesReturn: null,
    frequency: "",
    returnFrequency: "",
  });

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
