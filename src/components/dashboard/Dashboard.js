import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@material-ui/core";
import { MainWrapper, LinkRouter } from "../ui";
import { HistoricChart } from "./HistoricChart";
import {
  PortfolioContext,
  getPortfolioDetails,
} from "../../services/portfolio";
import {
  changeArrow,
  formatCurrency,
  formatPerc,
  getQuoteChangePerc,
} from "../../helpers";

const PriceTypography = styled(Typography)`
  && {
    color: ${(props) => (props.change >= 0 ? "green" : "red")};
  }
`;

const PriceTableCell = styled(TableCell)`
  && {
    color: ${(props) => (props.change >= 0 ? "green" : "red")};
  }
`;

export const Dashboard = () => {
  const { portfolio, setPortfolio } = useContext(PortfolioContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPortfolioDetails(setPortfolio).then(() => setIsLoading(false));
  }, [setPortfolio]);

  const netPortfolio = portfolio.balance + portfolio.totalValue;
  const totalPortfolioReturn = portfolio.totalReturn;
  const totalPortfolioReturnPerc = totalPortfolioReturn / 100000;
  return (
    <MainWrapper>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2">Portfolio Position</Typography>
            <Paper variant="outlined">
              <Box minHeight="15rem" p="1rem">
                <Typography variant="body2">Net Portfolio</Typography>
                <Typography variant="h4">
                  {formatCurrency(netPortfolio)}
                </Typography>
                <PriceTypography
                  variant="body1"
                  change={totalPortfolioReturn}
                >{`${totalPortfolioReturn >= 0 ? "+" : ""}${formatCurrency(
                  totalPortfolioReturn
                )}  (${formatPerc(
                  Math.abs(totalPortfolioReturnPerc)
                )}) Total ${changeArrow(
                  totalPortfolioReturn
                )}`}</PriceTypography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">Historical Performance </Typography>{" "}
            <Paper variant="outlined">
              <Box minHeight="15rem">
                <HistoricChart netPortfolio={netPortfolio} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Portfolio Constituents </Typography>{" "}
            <Paper variant="outlined">
              <Box minHeight="15em">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell align="right">Units</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Change %</TableCell>
                      <TableCell align="right">Average Price</TableCell>
                      <TableCell align="right">Current Value</TableCell>
                      <TableCell align="right">Total Paid</TableCell>
                      <TableCell align="right">Total Return</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key="currency">
                      <TableCell colSpan={5}>CASH</TableCell>
                      <TableCell align="right">
                        {formatCurrency(portfolio.balance)}
                      </TableCell>
                      <TableCell colSpan={2}></TableCell>
                    </TableRow>
                    {portfolio.portfolio.map((stock) => {
                      const changePerc = getQuoteChangePerc(
                        stock.current,
                        stock.previous
                      );
                      const totalReturn = stock.return;
                      const totalReturnPerc = totalReturn / stock.buy.total;
                      return (
                        <TableRow key={stock.symbol}>
                          <TableCell>
                            <LinkRouter to={`stocks/${stock.symbol}`}>
                              {stock.symbol}
                            </LinkRouter>
                          </TableCell>
                          <TableCell align="right">{stock.quantity}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.current)}
                          </TableCell>
                          <PriceTableCell
                            align="right"
                            change={changePerc}
                          >{`${formatPerc(Math.abs(changePerc))} ${changeArrow(
                            changePerc
                          )}`}</PriceTableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.buy.weighted_average)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.value)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.buy.total)}
                          </TableCell>
                          <PriceTableCell align="right" change={totalReturn}>
                            {`${formatCurrency(totalReturn)} (${formatPerc(
                              Math.abs(totalReturnPerc)
                            )}) ${changeArrow(totalReturn)}`}
                          </PriceTableCell>
                        </TableRow>
                      );
                    })}
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
