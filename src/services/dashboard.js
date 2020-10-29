import { GETRequest, POSTRequest } from "./api";

/**
 * Gets the stocks owned
 * @return {Promise<{string[]}>} The list of all stocks owned
 */
export function stocksOwned() {
  const path = `/viewstocksowned/`;
  return GETRequest(path);
}

export function currentBalance() {
  const path = `/viewbalance/user/`;
  return GETRequest(path);
}
