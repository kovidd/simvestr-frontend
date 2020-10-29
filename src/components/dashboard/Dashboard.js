import React, { useState } from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { MainWrapper } from "../ui";

export const Dashboard = () => {
  return (
    <MainWrapper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <Box minHeight="10rem">
              <div>Summary (TODO)</div>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined">
            <Box minHeight="10rem">
              <div>Stock Chart (TODO)</div>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Box minHeight="10rem">
              <div>Constituents (TODO)</div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </MainWrapper>
  );
};
