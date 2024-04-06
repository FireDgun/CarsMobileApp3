import { useState } from "react";
import { initialRideObject } from "../utils/ridesHelper";

export default function usePostRide(initialRide) {
  const [formData, setFormData] = useState(initialRide ?? initialRideObject);

  const updateStopsPreservingAddress = (field, value, prevFormData) => {
    return {
      ...prevFormData,
      [field]: value.map((stop, stopIndex) => {
        const existingStop = prevFormData[field][stopIndex];
        return {
          ...stop,
          // Preserve address name from the existing stop if available
          addressName: existingStop
            ? existingStop.addressName
            : stop.addressName || "",
        };
      }),
    };
  };

  const updateFieldPreservingAddress = (field, value, prevFormData) => {
    return {
      ...prevFormData,
      [field]: { ...value, addressName: prevFormData[field].addressName },
    };
  };

  const handleInputChange = (field, value, editWithoutAddress = false) => {
    setFormData((prev) => {
      if (editWithoutAddress) {
        if (field === "stops" || field === "stopsReturn") {
          return updateStopsPreservingAddress(field, value, prev);
        }
        return updateFieldPreservingAddress(field, value, prev);
      }
      // Direct update for all other cases
      return { ...prev, [field]: value };
    });
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
