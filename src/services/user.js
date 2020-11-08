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
  const path = "/token";
  return POSTRequest(path, payload);
}

export function forgotPassword(payload) {
  let options = { headers: { "Content-Type": "application/text" } };
  const path = `/forgotuser?email_id=${payload.email_id}`;
  return GETRequest(path, options);
}

export function resetPassword(payload) {
  const path = "/forgotuser";
  return PUTRequest(path, payload);
}

export function userDetails() {
  const path = "/verifytoken";
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
