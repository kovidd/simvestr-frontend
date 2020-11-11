import React, { useState, useEffect } from "react";
import {
  Box, Typography, Grid, Button
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  exportPortfolio,
} from "../../services/export";


const StyledH3 = styled.h3` font-size:26px; text-align:center; margin:0; padding:0;`;
const StyledMsg = styled.h3` font-size:24px; color: #992222; text-align:center; margin:0; padding: 20px 0;`;
const StyledP = styled.p` font-size:18px; margin:20px 25% 0; text-align:center; padding:0`;


export const Export = () => {
  const history = useHistory();
  const [apiMessage, setAPIMessage] = useState({ "message": "." });
  const beginExport = () => {
    async function callExportfolio() {
      const res = await exportPortfolio();
      if (!res.error) {
        setAPIMessage({ "message": res.data });
      } else {
        setAPIMessage({ "message": "error downloading portfolio" });
      }
    }
    callExportfolio();
  }

  useEffect(() => {
    document.getElementById("screenMessage").innerHTML = apiMessage["message"]
  }, [apiMessage]);

  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
        fontSize="10"
        align="center" >
      </Box>
      <Typography variant="h2" align="center">Simvestr</Typography>
      <StyledH3> Export Your Portfolio Data To CSV</StyledH3>
      <StyledP> Your portfolio data will be downloaded in CSV format to your download directory.
        </StyledP>
      <StyledMsg id="screenMessage"></StyledMsg>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => beginExport()}
            >
              Export
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="left">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/settings")}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>



    </MainWrapper>
  );
};
