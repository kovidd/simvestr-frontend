import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";

import { StockSummary } from "./StockSummary";
import { StockTrade } from "./StockTrade";
import { StockChart } from "./StockChart";

export const StockDetails = ({ details }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Paper variant="outlined">
        <Box minHeight="200px">
          <StockChart details={details} symbol={details.symbol} />
        </Box>
      </Paper>
    </Grid>
    <Grid item xs={12} md={4}>
      <Paper variant="outlined">
        <Box p="1rem">
          <StockSummary details={details} hasButton={true} />
        </Box>
      </Paper>
    </Grid>
    <Grid item xs={12} md={8}>
      <Paper variant="outlined" style={{ height: "100%" }}>
        <Box p="1rem">
          <StockTrade symbol={details.symbol} quotePrice={details.quote.c} />
        </Box>
      </Paper>
    </Grid>
  </Grid>
);
