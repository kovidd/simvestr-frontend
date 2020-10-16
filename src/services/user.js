import { POSTRequest, GETRequest, PUTRequest } from "./api";

export function signup(payload) {
  const path = "/signup";
  return POSTRequest(path, null, payload);
}

export function login(payload) {
  const path =
    "/token?username=" + payload.email_id + "&password=" + payload.password;
  return GETRequest(path);
}

export function forgotPassword(payload) {
  const path = "/forgotuser/?username=" + payload.email_id;
  return GETRequest(path);
}

export function resetPassword(payload) {
  const path = "/forgotuser/";
  return PUTRequest(path, null, payload);
}
