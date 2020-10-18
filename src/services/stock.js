import { GETRequest } from "./api";

/**
 * Gets the details of the specified stock symbol
 * @param {string} stockSymbol The stock symbol/ticker
 * @return {Promise<{id: string, country: string, ticker: string}>} The details of the stock
 */
export function stockDetails(stockSymbol) {
  const path = `/search/symbol/${stockSymbol}`;
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
