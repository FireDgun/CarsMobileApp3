import { useState, useEffect } from "react";

const useRideNavigation = (route) => {
  const [selectedTab, setSelectedTab] = useState(
    route?.params?.initialPage ?? "chats"
  );
  const [initialRidePage, setInitialRidePage] = useState(
    route?.params?.initialSelectedTab ?? "MySellRides"
  );
  const [initialTab, setInitialTab] = useState(
    route?.params?.initialTab ?? "Open"
  );
  const [optionalNegotiationId, setOptionalNegotiationId] = useState(
    route?.params?.optionalNegotiationId ?? ""
  );
  const [optionalNegotiationRideId, setOptionalNegotiationRideId] = useState(
    route?.params?.optionalNegotiationRideId ?? ""
  );

  useEffect(() => {
    const newInitialPage = route?.params?.initialPage ?? "chats";
    const newInitialRidePage =
      route?.params?.initialSelectedTab ?? "MySellRides";
    const newInitialTab = route?.params?.initialTab ?? "Open";
    const newOptionalNegotiationId = route?.params?.optionalNegotiationId ?? "";
    const newOptionalNegotiationRideId =
      route?.params?.optionalNegotiationRideId ?? "";

    setOptionalNegotiationId(newOptionalNegotiationId);
    setOptionalNegotiationRideId(newOptionalNegotiationRideId);
    setSelectedTab(newInitialPage);
    setInitialRidePage(newInitialRidePage);
    setInitialTab(newInitialTab);
  }, [route]);

  return {
    selectedTab,
    initialRidePage,
    initialTab,
    optionalNegotiationId,
    optionalNegotiationRideId,
  };
};

export default useRideNavigation;
