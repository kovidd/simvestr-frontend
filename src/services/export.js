import { GETRequest } from "./api";

/**
 * Gets the position of user in the leaderboard
 * @return {Promise<string[]>} confirmation of download
 */
export function exportPortfolio() {
  const path = `/exportfolio`;
  return GETRequest(path);
}

