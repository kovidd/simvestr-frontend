import { GETRequest } from "./api";

/**
 * Gets a list of all the stocks
 * @return {Promise<string[]>} A list of all the stock tickers
 */
export function getTrades() {
  const path = `/transaction/user/`;
  return GETRequest(path);
}
