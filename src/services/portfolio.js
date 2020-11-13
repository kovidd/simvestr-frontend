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
  const path = `/portfolio/user?averagemode=moving`;
  return GETRequest(path, options);
}

/**
 * Gets the stocks owned by the user
 * @returns {Promise<{data: {stocksowned: {symbol: string; quantity: number}[]}}>}
 */
export function stocksOwned() {
  const path = `/portfolio/user/stocksowned`;
  return GETRequest(path);
}

/**
 * Gets the current balance of the user
 */
export function currentBalance() {
  const path = `/balance/user/`;
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
