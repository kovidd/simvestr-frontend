import React from "react";
import { POSTRequest, GETRequest, PUTRequest } from "./api";

export const UserContext = React.createContext({
  user: {
    firstName: "",
    lastName: "",
    email: "",
  },
  setUser: () => {},
});

/**
 * Create a new account for the user
 * @param {{email: string; password: string; first_name: string; last_name: string}} payload
 */
export function signup(payload) {
  const path = "/signup";
  return POSTRequest(path, payload);
}

/**
 * Login the user using the supplied credentials
 * @param {{email: string; password: string}} payload
 */
export function login(payload) {
  const path = "/login";
  return POSTRequest(path, payload);
}

/**
 * Refreshes the JWT token stored in the cookie
 */
export function refreshToken() {
  const path = "/refreshtoken";
  return PUTRequest(path);
}

/**
 * Send OTP to registered email
 * @param {{email: string}} payload
 */
export function forgotPassword(email) {
  let options = { headers: { "Content-Type": "application/text" } };
  const path = `/forgotuser?email=${email}`;
  return GETRequest(path, options);
}

/**
 * Resets the users password using the supplied OTP
 * @param {{email: string; password: string; OTP: string}} payload
 */
export function resetPassword(payload) {
  const path = "/forgotuser";
  return PUTRequest(path, payload);
}

/**
 * Gets the user details
 */
export function userDetails() {
  const path = "/user/info";
  return GETRequest(path);
}

/**
 * Updates the user's name
 * @param {{first_name: string; last_name: string}} payload
 */
export function changeName(payload) {
  const path = "/changedetails/changenames";
  return PUTRequest(path, payload);
}

/**
 * Updates the user's password
 * @param {{password: string}} payload
 */
export function changePassword(payload) {
  const path = "/changedetails/changepwd";
  return PUTRequest(path, payload);
}

/**
 * Logs out the user, removing the JWT token stored in the cookie
 */
export function logout() {
  const path = "/logout";
  return GETRequest(path);
}
