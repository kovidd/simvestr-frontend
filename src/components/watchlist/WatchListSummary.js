import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Link,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { stockDetails } from "../../services/stock";

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  & > * {
    padding-right: 0.25rem;
  }
`;

const PriceTypography = styled(Typography)`
  && {
    color: ${(props) => (props.change > 0 ? "green" : "red")};
  }
`;

export const WatchListSummary = (props) => {
  const [watchedStocks, setWatchedStocks] = useState([
    "AAPL",
    "MSFT",
    "TSLA",
    "GOOGL",
  ]); // need to get from api
  const [watchedStocksDetails, setWatchedStocksDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWatchListDetails() {
      watchedStocks.forEach(async function (stock) {
        const res = await stockDetails(stock);
        if (!res.error) {
          setWatchedStocksDetails((oldWatchedStocksDetails) => [
            ...oldWatchedStocksDetails,
            {
              symbol: res.data.symbol,
              name: res.data.name,
              c: res.data.quote.c,
              pc: res.data.quote.pc,
              change: res.data.quote.c - res.data.quote.pc,
              changePerc:
                Math.abs(
                  (res.data.quote.c - res.data.quote.pc) / res.data.quote.pc
                ) * 100,
            },
          ]);
        }
      });
      setIsLoading(false);
    }
    getWatchListDetails();
  }, [watchedStocks]);

  const handleRemove = async (symbol) => {
    // need to remove from api
    const del = watchedStocksDetails.filter((stock) => symbol !== stock.symbol);
    console.log(del);
    setWatchedStocksDetails(del);
  };

  return (
    <>
      <MainWrapper>
        {isLoading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          watchedStocksDetails && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Symbol</TableCell>
                  <TableCell align="center">Company</TableCell>
                  <TableCell align="center">Current Price (USD)</TableCell>
                  <TableCell align="center">Close Price (USD)</TableCell>
                  <TableCell align="center">Day Change</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center"> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watchedStocksDetails.map((stock) => (
                  <TableRow key={stock.symbol}>
                    <TableCell component="th" scope="row">
                      {stock.symbol}
                    </TableCell>
                    <TableCell align="center">{stock.name}</TableCell>
                    <TableCell align="center">{stock.c}</TableCell>
                    <TableCell align="center">{stock.pc}</TableCell>
                    <TableCell align="center">
                      <PriceWrapper>
                        <PriceTypography
                          variant="body1"
                          change={stock.change}
                        >{`${stock.change > 0 ? "+" : ""}${stock.change.toFixed(
                          2
                        )} (${stock.changePerc.toFixed(2)}%)${
                          stock.change > 0 ? "↑" : "↓"
                        }`}</PriceTypography>
                      </PriceWrapper>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          maxWidth: "40px",
                          maxHeight: "25px",
                        }}
                        onClick={() => props.handleDetails(stock.symbol)}
                      >
                        Details
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          maxWidth: "40px",
                          maxHeight: "25px",
                        }}
                        onClick={() => handleRemove(stock.symbol)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        )}
      </MainWrapper>
    </>
  );
};
