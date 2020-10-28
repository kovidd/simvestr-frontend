import { GETRequest, POSTRequest } from "./api";

/**
 * Add specified stock symbol to watchlist
 * @param {string} stockSymbol The stock symbol/ticker
 */
export function addStock(stockSymbol) {
  const path = `/watchlist/symbol/${stockSymbol}`;
  return POSTRequest(path);
}
