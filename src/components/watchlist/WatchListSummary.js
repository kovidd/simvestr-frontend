import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import {
  getWatchlist,
  removeStock,
  WatchlistContext,
} from "../../services/watchlist";
import { WatchlistRemoveConfirmation } from "./WatchListConfirmation";
import { NotificationContext } from "../ui/Notification";
import {
  formatCurrency,
  formatPerc,
  getQuoteChangePerc,
  getQuoteChange,
  changeArrow,
} from "../../helpers";
import { PriceTableCell, LinkRouter } from "../ui";

export const WatchListSummary = () => {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [stockRemove, setStockRemove] = useState("");
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function getWatchListDetails() {
      setIsLoading(true);
      const res = await getWatchlist();
      if (!res.error) {
        setWatchlist(res.data.watchlist);
      } else {
        setNotification({
          open: true,
          message: `Error loading watchlist.`,
        });
      }
      setIsLoading(false);
    }
    getWatchListDetails();
  }, [setNotification, setWatchlist, setIsLoading]);

  const handleRemove = async () => {
    const res = await removeStock(stockRemove);
    if (!res.error) {
      const remaining = watchlist.filter(
        (stock) => stockRemove !== stock.symbol
      );
      setWatchlist(remaining);
      setNotification({
        open: true,
        message: `${stockRemove} removed from watchlist.`,
      });
    } else {
      setNotification({
        open: true,
        message: `Error removing ${stockRemove} from watchlist.`,
      });
    }
    setOpen(false);
  };

  return (
    <>
      <WatchlistRemoveConfirmation
        open={open}
        handleClose={() => setOpen(false)}
        handleRemove={handleRemove}
        stockSymbol={stockRemove}
      />
      <MainWrapper>
        <Box mt="1rem">
          {isLoading ? (
            <LinearProgress />
          ) : (
            watchlist && (
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Company</TableCell>
                      <TableCell align="right">Current Price</TableCell>
                      <TableCell align="right">Close Price</TableCell>
                      <TableCell align="right">Day Change</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {watchlist.map((stock) => {
                      const change = getQuoteChange(stock.c, stock.pc);
                      const changePerc = getQuoteChangePerc(stock.c, stock.pc);
                      return (
                        <TableRow key={stock.symbol}>
                          <TableCell>
                            <LinkRouter to={`stocks/${stock.symbol}`}>
                              {stock.symbol}
                            </LinkRouter>
                          </TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.c)}
                          </TableCell>
                          <TableCell align="right">
                            {formatCurrency(stock.pc)}
                          </TableCell>
                          <PriceTableCell align="right" change={change}>
                            {`${formatCurrency(changePerc)} (${formatPerc(
                              Math.abs(changePerc)
                            )}) ${changeArrow(changePerc)}`}
                          </PriceTableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              onClick={() => {
                                setStockRemove(stock.symbol);
                                setOpen(true);
                              }}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )
          )}
        </Box>
      </MainWrapper>
    </>
  );
};
