const productionURL = undefined;

export const API =
  process.env.NODE_ENV === "production"
    ? productionURL
    : "http://127.0.0.1:5000/api/v1";
