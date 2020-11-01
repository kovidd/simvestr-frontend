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
 * @param {integer} leaderCount
 * @return {Promise<string[{id: integer, name: string, user: string, value: integer}]>}
 */
export function leaderboardLeaders(leaderCount = 6) {
  const path = `/leaderboard/top/${leaderCount}`;
  return GETRequest(path);
}
