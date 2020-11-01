import React, { useState } from "react";
import { Box, Grid, Paper, CircularProgress } from "@material-ui/core";

import { MainWrapper } from "../ui";
import { StockSearch } from "./StockSearch";
import { StockDetails } from "./StockDetails";
import { StockTrade } from "./StockTrade";

export const StockList = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainWrapper>
      <StockSearch setDetails={setDetails} setIsLoading={setIsLoading} />
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
