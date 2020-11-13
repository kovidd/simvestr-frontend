import { GETRequest, POSTRequest, DELETERequest } from "./api";

/**
 * Add specified stock symbol to watchlist
 * @param {string} stockSymbol The stock symbol/ticker
 */
export function addStock(stockSymbol) {
  const path = `/watchlist/${stockSymbol}`;
  return POSTRequest(path);
}

/**
 * Add specified stock symbol to watchlist
 * @param {string} stockSymbol The stock symbol/ticker
 */
export function removeStock(stockSymbol) {
  const path = `/watchlist/${stockSymbol}`;
  return DELETERequest(path);
}

/**
 * Gets a list of all the stocks
 * @return {Promise<string[]>} A list of all the stock tickers
 */
export function getWatchlist() {
  const path = `/watchlist`;
  return GETRequest(path);
}
