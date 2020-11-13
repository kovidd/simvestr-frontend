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
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { getWatchlist, removeStock } from "../../services/watchlist";
import { WatchlistRemoveConfirmation } from "./WatchListConfirmation";
import { NotificationContext } from "../ui/Notification";
import { formatCurrency } from "../../helpers";

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

export const WatchListSummary = () => {
  const history = useHistory();
  const [watchedStocksDetails, setWatchedStocksDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [stockRemove, setStockRemove] = useState("");
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function getWatchListDetails() {
      const res = await getWatchlist();
      if (!res.error) {
        Object.entries(res.data.watchlist).map(async function ([k, v]) {
          setWatchedStocksDetails((oldWatchedStocksDetails) => [
            ...oldWatchedStocksDetails,
            {
              symbol: res.data.watchlist[k].symbol,
              name: res.data.watchlist[k].name,
              c: res.data.watchlist[k].c,
              pc: res.data.watchlist[k].pc,
              change: res.data.watchlist[k].c - res.data.watchlist[k].pc,
              changePerc:
                Math.abs(
                  (res.data.watchlist[k].c - res.data.watchlist[k].pc) /
                    res.data.watchlist[k].pc
                ) * 100,
            },
          ]);
        });
      } else {
        setNotification({
          open: true,
          message: `Error loading watchlist.`,
        });
      }
    }
    getWatchListDetails();
    setIsLoading(false);
  }, [setNotification]);

  const handleRemove = async () => {
    const res = await removeStock(stockRemove);
    if (!res.error) {
      const del = watchedStocksDetails.filter(
        (stock) => stockRemove !== stock.symbol
      );
      setWatchedStocksDetails(del);
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
        <Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            watchedStocksDetails && (
              <TableContainer
                style={{
                  maxHeight: 448,
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Symbol</TableCell>
                      <TableCell align="center">Company</TableCell>
                      <TableCell align="center">Current Price</TableCell>
                      <TableCell align="center">Close Price</TableCell>
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
                        <TableCell align="center">
                          {formatCurrency(stock.c)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(stock.pc)}
                        </TableCell>
                        <TableCell align="center">
                          <PriceWrapper>
                            <PriceTypography
                              variant="body1"
                              change={stock.change}
                            >{`${stock.change > 0 ? "+" : ""}${formatCurrency(
                              stock.change.toFixed(2)
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
                            onClick={() =>
                              history.push(`/watchlist/${stock.symbol}`)
                            }
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
              </TableContainer>
            )
          )}
        </Box>
      </MainWrapper>
    </>
  );
};
