import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
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

export const WatchList = () => {
  const [watchedStocks, setWatchedStocks] = useState([
    "AAPL",
    "MSFT",
    "TSLA",
    "GOOGL",
  ]); // need to get from api
  const [watchedStocksDetails, setWatchedStocksDetails] = useState([]);

  useEffect(() => {
    async function getWatchListDetails() {
      watchedStocks.forEach(async function (stock) {
        const res = await stockDetails(stock);
        if (!res.error) {
          setWatchedStocksDetails((oldWatchedStocksDetails) => [
            ...oldWatchedStocksDetails,
            {
              symbol: res.data.ticker,
              name: res.data.name,
              c: res.data.quote.c,
              pc: res.data.quote.pc,
              change: Math.abs(res.data.quote.c - res.data.quote.pc),
              perchange: Math.abs(
                ((res.data.quote.c - res.data.quote.pc) / res.data.quote.pc) *
                  100
              ),
            },
          ]);
        }
      });
    }
    getWatchListDetails();
  }, [watchedStocks]);

  console.log(watchedStocksDetails);
  return (
    <>
      <MainWrapper>
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
                    <PriceTypography variant="body1" change={stock.change}>{`${
                      stock.change > 0 ? "+" : ""
                    }${stock.change.toFixed(2)} (${stock.perchange.toFixed(
                      2
                    )}%)${stock.perchange > 0 ? "↑" : "↓"}`}</PriceTypography>
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
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </MainWrapper>
    </>
  );
};
