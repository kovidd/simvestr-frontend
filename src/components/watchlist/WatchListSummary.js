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
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { getWatchlist, removeStock } from "../../services/watchlist";
import { WatchlistRemoveConfirmation } from "./WatchListConfirmation";

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
  const [watchedStocksDetails, setWatchedStocksDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [stockRemove, setStockRemove] = useState("");

  useEffect(() => {
    async function getWatchListDetails() {
      const res = await getWatchlist();
      if (!res.error) {
        Object.entries(res.data).map(async function ([k, v]) {
          setWatchedStocksDetails((oldWatchedStocksDetails) => [
            ...oldWatchedStocksDetails,
            {
              symbol: res.data[k].symbol,
              name: res.data[k].name,
              c: res.data[k].quote.c,
              pc: res.data[k].quote.pc,
              change: res.data[k].quote.c - res.data[k].quote.pc,
              changePerc:
                Math.abs(
                  (res.data[k].quote.c - res.data[k].quote.pc) /
                    res.data[k].quote.pc
                ) * 100,
            },
          ]);
        });
      }
    }
    getWatchListDetails();
    setIsLoading(false);
  }, []);

  const handleRemove = async () => {
    const res = await removeStock(stockRemove);
    if (!res.error) {
      const del = watchedStocksDetails.filter(
        (stock) => stockRemove !== stock.symbol
      );
      console.log(del);
      setWatchedStocksDetails(del);
    } else {
      console.log("error removing from watchlist");
    }
    setOpen(false);
  };

  return (
    <>
      <MainWrapper>
        <WatchlistRemoveConfirmation
          open={open}
          handleClose={() => setOpen(false)}
          handleRemove={handleRemove}
          stockSymbol={stockRemove}
        />
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
                        onClick={() => {
                          setStockRemove(stock.symbol);
                          setOpen(true);
                        }}
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
