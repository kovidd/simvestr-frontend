const productionURL = "UNDEFINED";

export const CORE =
  process.env.NODE_ENV === "production"
    ? productionURL
    : "http://127.0.0.1:5000";
