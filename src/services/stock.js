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
 * Searches for stocks which match the name
 * @param {string} name
 */
export function searchStockByName(name) {
  const path = `/search/${name}`;
  return GETRequest(path);
}

/**
 * Returns the candles for the specified stock
 * @param {string} stockSymbol
 * @param {"day" | "week" | "month"} range
 */
export function stockCandles(stockSymbol, range = "M", dateAdded = null) {
  let from = new Date();
  let resolution;
  switch (range) {
    case "D":
      resolution = "15";
      from.setDate(from.getDate() - 1);
      break;
    case "W":
      resolution = "60";
      from.setDate(from.getDate() - 7);
      break;
    case "M":
      resolution = "60";
      from.setMonth(from.getMonth() - 1);
      break;
    case "Y":
      resolution = "D";
      from.setFullYear(from.getFullYear() - 1);
      break;
    case "3Y":
      resolution = "W";
      from.setFullYear(from.getFullYear() - 3);
      break;
    case "AWL":
      resolution = "D";
      from = new Date(dateAdded * 1000);
      break;
    default:
      // defaults to the month
      resolution = "60";
      from.setMonth(from.getMonth() - 1);
      break;
  }
  from = Math.round(from.getTime() / 1000);
  const to = Math.round(Date.now() / 1000);

  const path = encodeURI(
    `/search/candle?symbol=${stockSymbol}&resolution=${resolution}&from=${from}&to=${to}`
  );
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
