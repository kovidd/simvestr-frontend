import React from "react";
import { GETRequest } from "./api";

export const PortfolioContext = React.createContext({
  portfolio: {
    name: "",
    balance: 0,
    previousBalance: 0,
    previousInvestmentValue: 0,
    totalValue: 0,
    totalReturn: 0,
    portfolio: [],
  },
  setPortfolio: () => {},
});

/**
 * Gets the users portfolio details
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

/**
 * Exports the users portfolio
 */
export function exportPortfolio() {
  const path = `/exportfolio`;
  return GETRequest(path);
}

export async function getPortfolioDetails(setPortfolio) {
  const res = await portfolioDetails();
  if (!res.error) {
    setPortfolio({
      name: res.data.portfolio_name,
      balance: res.data.balance,
      previousBalance: res.data.prev_balance,
      previousInvestmentValue: res.data.prev_investment_value,
      totalValue: res.data.total_value,
      totalReturn: res.data.total_return,
      portfolio: res.data.portfolio,
    });
  } else {
    console.error("Error getting the portfolio details");
  }
}
