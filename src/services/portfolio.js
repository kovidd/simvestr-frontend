import React from "react";
import { GETRequest } from "./api";

export const PortfolioContext = React.createContext({
  portfolio: {
    name: "",
    balance: 0,
    totalValue: 0,
    portfolio: [],
  },
  setPortfolio: () => {},
});

/**
 * Gets the users portfolio details
 * @return {Promise<{ data: {portfolio_name: string; balance: number; total_value: string; portfolio: object}}>} A list of all the stock tickers
 */
export function portfolioDetails() {
  let options = { headers: { "Content-Type": "application/text" } };
  const path = `/portfolio?averagemode=moving`;
  return GETRequest(path, options);
}

/**
 * Gets the portfolio history
 * @param {number} num_days
 */
export function portfolioHistory(num_days = 7) {
  const path = `/portfolio/historic?number_of_days=${num_days}`;
  return GETRequest(path);
}

/*
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
      totalReturn: res.data.total_return,
      portfolio: res.data.portfolio,
    });
  } else {
    console.error("Error getting the portfolio details");
  }
}
