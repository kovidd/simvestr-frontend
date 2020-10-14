import { POSTRequest } from "./api";

export function signup(payload) {
  const path = "/signup";
  return POSTRequest(path, payload);
}

export function login(payload) {
  const path = "/token";
}
