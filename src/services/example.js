import { GETRequest } from "./api";

export function hello() {
  const path = "/hello";
  return GETRequest(path);
}
