import React from "react";
import { GETRequest } from "./api";

export const PortfolioContext = React.createContext({
  portfolio: {
    name: "",
    balance: 0,
    totalValue: 0,
    portfolio: {},
  },
  setPortfolio: () => {},
});

/**
 * Gets the users portfolio details
 * @return {Promise<{ data: {portfolio_name: string; balance: number; total_value: string; portfolio: object}}>} A list of all the stock tickers
 */
export function portfolioDetails() {
  const path = `/viewportfolio/user`;
  return GETRequest(path);
}

/**
 * Fetches the portfolio details and sets them
 * @param {*} setPortfolio
 */
export async function getPortfolioDetails(setPortfolio) {
  const res = await portfolioDetails();
  if (!res.error) {
    setPortfolio({
      name: res.data.portfolio_name,
      balance: res.data.balance,
      totalValue: res.data.total_value,
      portfolio: res.data.portfolio,
    });
  } else {
    console.error("Error getting the portfolio details");
  }
}
