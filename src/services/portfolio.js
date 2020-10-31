import { GETRequest } from "./api";

/**
 * Gets the position of user (userID)
 * @param {integer} userID The users id
 * @return {Promise<string[]>} position of the user in the leaderboard
 */
export function leaderboardPosition(userID) {
  const path = `/leaderboard/position/${userID}`;
  return GETRequest(path);
}

/**
 * Gets details of the top <leader_count> highest value portfolio
 * @param {integer} leader_count 
 * @return {Promise<string[{id: integer, name: string, user: string, value: integer}]>} 
 */
export function leaderboardLeaders(leader_count) {
  const path = `/leaderboard/top/${leader_count}`;
  return GETRequest(path);
}
