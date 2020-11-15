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

export function signup(payload) {
  const path = "/signup";
  return POSTRequest(path, payload);
}

export function login(payload) {
  const path = "/login";
  return POSTRequest(path, payload);
}

export function refreshToken() {
  const path = "/refreshtoken";
  return PUTRequest(path);
}

export function forgotPassword(payload) {
  let options = { headers: { "Content-Type": "application/text" } };
  const path = `/forgotuser?email=${payload.email}`;
  return GETRequest(path, options);
}

export function resetPassword(payload) {
  const path = "/forgotuser";
  return PUTRequest(path, payload);
}

export function userDetails() {
  const path = "/user/info";
  return GETRequest(path);
}

export function changeName(payload) {
  const path = "/changedetails/changenames";
  return PUTRequest(path, payload);
}

export function changePassword(payload) {
  const path = "/changedetails/changepwd";
  return PUTRequest(path, payload);
}

export function logout() {
  const path = "/logout";
  return GETRequest(path);
}
