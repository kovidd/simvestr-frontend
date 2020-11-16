import React from "react";
import { GETRequest, POSTRequest, DELETERequest } from "./api";

export const WatchlistContext = React.createContext({
  watchlist: [],
  setWatchlist: () => {},
});

/**
 * Add the specified stock symbol to watchlist
 * @param {string} symbol The stock symbol/ticker
 */
export function addStock(symbol) {
  const path = `/watchlist`;
  const payload = {
    symbol,
  };
  return POSTRequest(path, payload);
}

/**
 * Remove the specified stock symbol from the watchlist
 * @param {string} symbol The stock symbol/ticker
 */
export function removeStock(symbol) {
  const path = `/watchlist`;
  const payload = {
    symbol,
  };
  return DELETERequest(path, payload);
}

/**
 * Get the users watchlist details
 */
export function getWatchlist() {
  const path = `/watchlist`;
  return GETRequest(path);
}
