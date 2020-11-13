import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { StockSearch } from "./StockSearch";
import { StockDetails } from "./StockDetails";
import { NotificationContext } from "../ui/Notification";
import { stockDetails } from "../../services/stock";

export const StockList = () => {
  let { symbol } = useParams();
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
      }
      setIsLoading(false);
    }
    if (symbol) {
      getStockDetails(symbol);
    }
  }, [setIsLoading, setNotification, symbol]);

  return (
    <MainWrapper>
      <Box>
        <StockSearch />
        {isLoading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flex="1"
          >
            <CircularProgress />
          </Box>
        ) : (
          details && <StockDetails details={details} />
        )}
      </Box>
    </MainWrapper>
  );
};
