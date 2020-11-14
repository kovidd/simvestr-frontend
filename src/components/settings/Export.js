import React, { useContext } from "react";
import { saveAs } from "file-saver";
import { Box, Grid, Button } from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { exportPortfolio } from "../../services/export";
import { NotificationContext } from "../ui/Notification";

const StyledH3 = styled.h3`
  font-size: 26px;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const StyledP = styled.p`
  font-size: 18px;
  margin: 20px 25% 0;
  text-align: center;
  padding: 0;
`;

export const Export = () => {
  const history = useHistory();
  const { setNotification } = useContext(NotificationContext);

  const beginExport = () => {
    async function callExportfolio() {
      const res = await exportPortfolio();
      if (!res.error) {
        const blob = res.data;
        saveAs(blob, "portfolio.xlsx");
        setNotification({
          open: true,
          message: `Portfolio exported successfully.`,
        });
      } else {
        setNotification({
          open: true,
          message: `Error exporting portfolio.`,
        });
      }
    }
    callExportfolio();
  };

  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
        fontSize="10"
        align="center"
      ></Box>
      <StyledH3> Export Your Portfolio Data To CSV</StyledH3>
      <StyledP>
        Your portfolio data will be downloaded in CSV format to your download
        directory.
      </StyledP>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ bottom: "-25px" }}
              onClick={beginExport}
            >
              Export
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ bottom: "-25px" }}
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
