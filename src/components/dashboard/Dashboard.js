import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { stocksOwned, currentBalance } from "../../services/dashboard";
import { stockDetails } from "../../services/stock";

const PriceTypography = styled(Typography)`
  && {
    color: ${(props) => (props.change > 0 ? "green" : "red")};
  }
`;

export const Dashboard = () => {
  const [constituents, setConstituents] = useState([]);
  const [portofolioName, setPortfolioName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioPosition, setPortfolioPosition] = useState(true);

  useEffect(() => {
    async function getBalance() {
      const res = await currentBalance();
      if (!res.error) {
        setPortfolioName(res.data.data.name);
      }
      setConstituents((oldConstituents) => [
        ...oldConstituents,
        { symbol: "Currency", value: res.data.data.balance },
      ]);
    }

    async function getStocksOwned() {
      const res = await stocksOwned();
      if (!res.error) {
        Object.entries(res.data).map(async function ([k, v]) {
          const res = await stockDetails(k);
          if (!res.error) {
            setConstituents((oldConstituents) => [
              ...oldConstituents,
              {
                symbol: res.data.symbol,
                name: res.data.name,
                c: res.data.quote.c,
                shares: v,
                value: res.data.quote.c * v,
              },
            ]);
          }
        });
      }
    }

    getBalance();
    getStocksOwned();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setPortfolioPosition({
      currentValue: constituents.reduce((v, stock) => v + stock.value, 0),
      totalReturn:
        constituents.reduce((v, stock) => v + stock.value, 0) - 100000,
      totalReturnPerc:
        Math.abs(
          (constituents.reduce((v, stock) => v + stock.value, 0) - 100000) /
            100000
        ) * 100,
    });
  }, [constituents]);

  console.log(portfolioPosition);
  return (
    <MainWrapper>
      <Typography variant="h5">{portofolioName} </Typography>{" "}
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="b2">Portfolio Position </Typography>
            <Paper variant="outlined">
              <Box minHeight="15rem">
                <Typography variant="h6">Total Value </Typography>
                <Typography variant="h6">
                  USD {portfolioPosition.currentValue}
                </Typography>
                <Typography variant="h6">Day Return </Typography>
                <Typography variant="h6">USD</Typography>
                <Typography variant="h6">Total Return </Typography>
                <Typography variant="h6">
                  <PriceTypography variant="h6">{`${
                    portfolioPosition.totalReturn > 0 ? "+" : ""
                  } USD ${portfolioPosition.totalReturn.toFixed(
                    2
                  )} (${portfolioPosition.totalReturnPerc.toFixed(2)}%)${
                    portfolioPosition.totalReturn > 0 ? "↑" : "↓"
                  }`}</PriceTypography>
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="b2">Historical Performance </Typography>{" "}
            <Paper variant="outlined">
              <Box minHeight="15rem">
                <div> </div>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="b2">Portfolio Constituents </Typography>{" "}
            <Paper variant="outlined">
              <Box minHeight="15em">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Symbol</TableCell>
                      <TableCell align="center">Company</TableCell>
                      <TableCell align="center">Shares</TableCell>
                      <TableCell align="center">Total Cost (USD)</TableCell>
                      <TableCell align="center">Current Value (USD)</TableCell>
                      <TableCell align="center">Return</TableCell>
                      <TableCell align="center"> </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {constituents.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell component="th" scope="row">
                          {stock.symbol}
                        </TableCell>
                        <TableCell align="center">{stock.name}</TableCell>
                        <TableCell align="center">{stock.shares}</TableCell>
                        <TableCell align="center">{stock.cost}</TableCell>
                        <TableCell align="center">{stock.value}</TableCell>
                        <TableCell align="center">{stock.return}</TableCell>
                        {stock.symbol === "Currency" ? (
                          <TableCell align="center">{}</TableCell>
                        ) : (
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color="primary"
                              style={{
                                maxWidth: "100px",
                                maxHeight: "25px",
                              }}
                            >
                              Buy / Sell
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </MainWrapper>
  );
};
