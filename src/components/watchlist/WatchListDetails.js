import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, CircularProgress, Link } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { stockDetails } from "../../services/stock";
import { StockDetails } from "../stocks/StockDetails";
import { StockTrade } from "../stocks/StockTrade";

export const WatchListDetails = (props) => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.error("error getting the stock details");
      }
      setIsLoading(false);
    }
    getStockDetails(props.symbol);
  }, [setIsLoading]);

  return (
    <MainWrapper>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        details && (
          <Grid container spacing={2}>
            <Grid container item xs={12} justify="flex-end">
              <Link href="./watchlist">Back to WatchList</Link>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined">
                <Box p="1rem">
                  <StockDetails details={details} hasButton={false} />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper variant="outlined">
                <Box minHeight="10rem">
                  <div>Stock Chart (TODO)</div>
                </Box>
              </Paper>
              <Box my="1rem">
                <Paper variant="outlined">
                  <Box p="1rem">
                    <StockTrade
                      symbol={details.symbol}
                      quotePrice={details.quote.c}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </MainWrapper>
  );
};
