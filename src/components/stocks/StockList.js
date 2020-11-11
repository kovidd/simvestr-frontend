import React, { useState } from "react";
import { Box, CircularProgress } from "@material-ui/core";

import { MainWrapper } from "../ui";
import { StockSearch } from "./StockSearch";
import { StockDetails } from "./StockDetails";

export const StockList = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainWrapper>
      <Box width="50vw">
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
          details && <StockDetails details={details} />
        )}
      </Box>
    </MainWrapper>
  );
};
