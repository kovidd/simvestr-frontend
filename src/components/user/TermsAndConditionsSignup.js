import React from "react";
import { Box, Typography } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { TermsAndConditionsText } from "./TermsAndConditionsText";

export const TermsAndConditionsSignup = () => {
  return (
    <MainWrapper>
      <Box height="100%">
        <Typography variant="h4">Terms and Conditions</Typography>
        <TermsAndConditionsText />
      </Box>
    </MainWrapper>
  );
};
