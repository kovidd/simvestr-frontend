const productionURL = undefined;

export const API =
  process.env.NODE_ENV === "production" ? productionURL : "/api/v1";
