import React from "react";
import { Box } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { TermsAndConditionsText } from "../user/TermsAndConditionsText";

export const TermsAndConditionsSettings = () => {
  return (
    <MainWrapper>
      <Box height="100%">
        <TermsAndConditionsText />
      </Box>
    </MainWrapper>
  );
};
