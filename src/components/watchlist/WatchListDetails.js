import React, { useState, useEffect, useContext } from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { stockDetails } from "../../services/stock";
import { useParams } from "react-router-dom";
import { StockDetails } from "../stocks/StockDetails";
import { NotificationContext } from "../ui/Notification";

export const WatchListDetails = () => {
  let { symbol } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function getStockDetails(symbol) {
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
          change: res.data.quote.c - res.data.quote.pc,
          changePerc:
            Math.abs(
              (res.data.quote.c - res.data.quote.pc) / res.data.quote.pc
            ) * 100,
        });
      } else {
        setNotification({
          open: true,
          message: `Error getting the stock details.`,
        });
      }
      setIsLoading(false);
    }
    getStockDetails(symbol);
  }, [setIsLoading, setNotification, symbol]);

  return (
    <MainWrapper>
      <Box width="50vw" mt="1rem">
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          details && <StockDetails details={details} disableWatchlist />
        )}
      </Box>
    </MainWrapper>
  );
};
