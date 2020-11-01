import React, { useState } from "react";
import { WatchListSummary } from "./WatchListSummary";
import { WatchListDetails } from "./WatchListDetails";

export const WatchList = () => {
  const [symbol, setSymbol] = useState("");

  const handleDetails = (symbol) => {
    setSymbol(symbol);
    history.push;
  };

  return symbol === "" ? (
    <WatchListSummary handleDetails={handleDetails} />
  ) : (
    <WatchListDetails prop1={symbol} prop2={handleBack} />
  );
};
