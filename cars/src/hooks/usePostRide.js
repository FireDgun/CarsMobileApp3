import { useState } from "react";
import { initialRideObject } from "../utils/ridesHelper";

export default function usePostRide(initialRide) {
  const [formData, setFormData] = useState(initialRide ?? initialRideObject);

  const handleInputChange = (field, value, editWithoutAddress = false) => {
    if (editWithoutAddress) {
      if (field == "stops" || field == "stopsReturn") {
        setFormData((prev) => ({
          ...prev,
          [field]: value.map((stop, stopIndex) => {
            // Check if the corresponding stop exists in the previous state
            const existingStop = prev[field][stopIndex];
            return {
              ...stop,
              // Use the address from the existing stop if it exists, otherwise set a default or handle as needed
              addressName: existingStop
                ? existingStop.addressName
                : stop.addressName || "",
            };
          }),
        }));

        return;
      }
      setFormData((prev) => ({
        ...prev,
        [field]: { ...value, addressName: prev[field].addressName },
      }));
      return;
    }
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

  const handleUpdateTripData = (
    data,
    index,
    originOrDestination,
    editWithoutAddress = false
  ) => {
    let newTripLocations = JSON.parse(JSON.stringify(formData.tripLocations));
    newTripLocations[index][originOrDestination] = data;
    if (editWithoutAddress) {
      if (originOrDestination == "stops") {
        newTripLocations[index].stops = newTripLocations[index].stops.map(
          (stop, stopIndex) => ({
            ...stop,
            addressName:
              formData.tripLocations[index].stops[stopIndex] &&
              formData.tripLocations[index].stops[stopIndex].addressName
                ? formData.tripLocations[index].stops[stopIndex].addressName
                : stop.addressName,
          })
        );
      }
      if (
        originOrDestination == "origin" ||
        originOrDestination == "destination"
      ) {
        newTripLocations[index][originOrDestination].addressName =
          formData.tripLocations[index][originOrDestination].addressName;
      }
    }
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
