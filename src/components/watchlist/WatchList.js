import React, { useState, useEffect } from "react";
import { WatchListSummary } from "./WatchListSummary";
import { WatchListDetails } from "./WatchListDetails";

export const WatchList = () => {
  const [renderComponent, setRenderComponent] = useState("");

  const handleDetails = (symbol) => {
    setRenderComponent(symbol);
  };

  return renderComponent === "" ? (
    <WatchListSummary handleDetails={handleDetails} />
  ) : (
    <WatchListDetails symbol={renderComponent} />
  );
};
