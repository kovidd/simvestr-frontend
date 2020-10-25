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
  const path = "/forgotuser/?username=" + payload.email_id;
  return GETRequest(path);
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
