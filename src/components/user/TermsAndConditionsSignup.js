import React from "react";
import {
  Box,
  Typography,
  Link
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { TermsAndConditionsText } from "./TermsAndConditionsText";

export const TermsAndConditionsSignup = () => {
  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
        fontSize="10"
        align="center" >
        <Box align="left">
          <Typography>
            <Link href="./signup">Back to Sign Up Page</Link>
          </Typography>
        </Box>
        <TermsAndConditionsText />
      </Box>
    </MainWrapper>
  );
};
