import { GETRequest } from "./api";

/**
 * Gets the position of user in the leaderboard
 * @return {Promise<string[]>} position of the user in the leaderboard
 */
export function leaderboardPosition() {
  const path = `/leaderboard/position`;
  return GETRequest(path);
}

/**
 * Gets details of the top <leaderCount> highest value portfolio
 * @return {Promise<string[{id: integer, position: integer, name: string, user: string, value: float}]>}
 */
export function leaderboardAll() {
  const path = `/leaderboard/all`;
  return GETRequest(path);
}
