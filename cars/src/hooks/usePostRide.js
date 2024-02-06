import { useState } from "react";

export default function usePostRide() {
  const [formData, setFormData] = useState({
    date: null,
    endDate: null,
    startTime: null,
    endTime: null,
    origin: "",
    destination: "",
    numberOfPassengers: "",
    price: "",
    paymentMethod: "מזומן מהלקוח",
    specialOption: [],
    notes: "",
    flightNumber: null,
    numberOfSuitcases: null,
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

  return {
    formData,
    handleInputChange,
    handleSpecialOptionChange,
  };
}
