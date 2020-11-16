import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Box, LinearProgress } from "@material-ui/core";
import { StockSearch } from "./StockSearch";
import { StockDetails } from "./StockDetails";
import { NotificationContext } from "../ui/Notification";
import { stockDetails } from "../../services/stock";
import { getWatchlist, WatchlistContext } from "../../services/watchlist";

export const StockOverview = () => {
  let { symbol } = useParams();
  let location = useLocation();
  const { setWatchlist } = useContext(WatchlistContext);
  const { setNotification } = useContext(NotificationContext);
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getStockDetails(symbol) {
      setIsLoading(true);
      const res = await stockDetails(symbol);
      if (!res.error) {
        setDetails({
          quote: Object.fromEntries(
            Object.entries(res.data.quote).map(([k, v]) => [k, parseFloat(v)])
          ),
          logo: res.data.logo,
          exchange: res.data.exchange.split(" ")[0],
          symbol: res.data.symbol,
          name: res.data.name,
          industry: res.data.industry,
          marketCapitalization: parseInt(res.data.marketCapitalization),
        });
      } else {
        setNotification({
          open: true,
          message: `Error getting the stock details.`,
        });
        setDetails(null);
      }
      setIsLoading(false);
    }
    if (symbol) {
      getStockDetails(symbol);
    }
  }, [setIsLoading, setNotification, symbol]);

  useEffect(() => {
    async function getWatchListDetails() {
      const res = await getWatchlist();
      if (!res.error) {
        setWatchlist(res.data.watchlist);
      } else {
        setNotification({
          open: true,
          message: `Error loading watchlist.`,
        });
      }
    }
    getWatchListDetails();
  }, [setNotification, setWatchlist]);

  useEffect(() => {
    if (location.pathname === "/stocks") {
      setDetails(null);
      setIsLoading(false);
    }
  }, [location.pathname]);

  return (
    <Box>
      <StockSearch />
      {isLoading ? (
        <LinearProgress />
      ) : (
        details && <StockDetails details={details} />
      )}
    </Box>
  );
};
