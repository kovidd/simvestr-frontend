import React, { useState } from "react";
import { Box, Grid, Paper, CircularProgress } from "@material-ui/core";

import { MainWrapper } from "../ui";
import { StockSearch } from "./StockSearch";
import { StockDetails } from "./StockDetails";
import { StockTrade } from "./StockTrade";

// An example stock payload from the backend (for reference)
// const exampleStock = {
//   country: "US",
//   currency: "USD",
//   exchange: "NASDAQ NMS - GLOBAL MARKET",
//   finnhubIndustry: "Technology",
//   ipo: "1980-12-12",
//   logo:
//     "https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png",
//   marketCapitalization: 2068723,
//   name: "Apple Inc",
//   phone: "14089961010",
//   quote: {
//     c: 117.51,
//     h: 118.98,
//     l: 115.63,
//     o: 116.19,
//     pc: 115.98,
//     t: 1603265910,
//   },
//   shareOutstanding: 17102.536,
//   ticker: "AAPL",
//   weburl: "https://www.apple.com/",
// };

export const StockList = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainWrapper>
      <StockSearch setDetails={setDetails} setIsLoading={setIsLoading} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        details && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper variant="outlined">
                <Box p="1rem">
                  <StockDetails details={details} hasButton={true} />
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
