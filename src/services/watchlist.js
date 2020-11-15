import React from "react";
import { GETRequest, POSTRequest, DELETERequest } from "./api";

export const WatchlistContext = React.createContext({
  watchlist: [],
  setWatchlist: () => {},
});

/**
 * Add specified stock symbol to watchlist
 * @param {string} stockSymbol The stock symbol/ticker
 */
export function addStock(payload) {
  const path = `/watchlist`;
  return POSTRequest(path, payload);
}

/**
 * Add specified stock symbol to watchlist
 * @param {string} stockSymbol The stock symbol/ticker
 */
export function removeStock(payload) {
  const path = `/watchlist`;
  return DELETERequest(path, payload);
}

/**
 * Gets a list of all the stocks
 * @return {Promise<string[]>} A list of all the stock tickers
 */
export function getWatchlist() {
  const path = `/watchlist`;
  return GETRequest(path);
}
