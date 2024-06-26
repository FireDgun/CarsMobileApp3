import { useState, useEffect } from "react";

const useRideNavigation = (route) => {
  const initialParams = route?.params || {};
  const [selectedTab, setSelectedTab] = useState(
    initialParams.initialPage || "chats"
  );
  const [initialRidePage, setInitialRidePage] = useState(
    initialParams.initialSelectedTab || "MySellRides"
  );
  const [initialTab, setInitialTab] = useState(
    initialParams.initialTab || "Open"
  );
  const [optionalNegotiationId, setOptionalNegotiationId] = useState(
    initialParams.optionalNegotiationId || ""
  );
  const [optionalNegotiationRideId, setOptionalNegotiationRideId] = useState(
    initialParams.optionalNegotiationRideId || ""
  );

  useEffect(() => {
    const newParams = route?.params || {};
    setSelectedTab(newParams.initialPage || "chats");
    setInitialRidePage(newParams.initialSelectedTab || "MySellRides");
    setInitialTab(newParams.initialTab || "Open");
    setOptionalNegotiationId(newParams.optionalNegotiationId || "");
    setOptionalNegotiationRideId(newParams.optionalNegotiationRideId || "");
  }, [route]);

  return {
    selectedTab,
    setSelectedTab,
    initialRidePage,
    initialTab,
    optionalNegotiationId,
    optionalNegotiationRideId,
  };
};

export default useRideNavigation;
