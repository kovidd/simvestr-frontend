import { GETRequest } from "./api";

/**
 * Deletes the users account
 */
export function deleteAccount() {
  const path = `/deleteaccount`;
  return GETRequest(path);
}
