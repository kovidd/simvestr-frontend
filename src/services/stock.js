import { GETRequest, POSTRequest } from "./api";

/**
 * Gets the details of the specified stock symbol
 * @param {string} stockSymbol The stock symbol/ticker
 * @return {Promise<{id: string, country: string, ticker: string}>} The details of the stock
 */
export function stockDetails(stockSymbol) {
  const path = `/search/details/${stockSymbol}`;
  return GETRequest(path);
}

/**
 * Gets a list of all the stocks
 * @return {Promise<string[]>} A list of all the stock tickers
 */
export function stockList() {
  const path = `/stocks`;
  return GETRequest(path);
}

/**
 * Places a market order (buy or sell) for the specified stock
 * @param {{ symbol: string; quote: number; trade_type: "buy" | "sell"; quantity: number}} payload The payload for placing a market order
 */
export function marketOrder(payload) {
  const path = `/marketorder`;
  return POSTRequest(path, payload);
}
