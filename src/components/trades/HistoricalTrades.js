import React, { useState, useEffect, useContext } from "react";
import * as dayjs from "dayjs";
import styled from "styled-components";
import {
  Box,
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
import { getTrades } from "../../services/trades";
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
    color: ${(props) => (props.quantity < 0 ? "green" : "red")};
  }
`;

export const HistoricalTrades = () => {
  const [tradeDetails, setTradeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function getHistoricalTrades() {
      const res = await getTrades();
      if (!res.error) {
        Object.entries(res.data.transactions).map(async function ([k, v]) {
          setTradeDetails((oldTradeDetails) => [
            ...oldTradeDetails,
            {
              date: res.data.transactions[k].timestamp * 1000,
              symbol: res.data.transactions[k].symbol,
              quantity: res.data.transactions[k].quantity,
              quote: res.data.transactions[k].quote,
              type: res.data.transactions[k].quantity > 0 ? "Buy" : "Sell",
              total:
                res.data.transactions[k].quantity *
                res.data.transactions[k].quote,
            },
          ]);
        });
      } else {
        setNotification({
          open: true,
          message: `Error loading historical trades.`,
        });
      }
    }
    getHistoricalTrades();
    setIsLoading(false);
  }, [setNotification]);

  return (
    <>
      <MainWrapper>
        <Box>
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            tradeDetails && (
              <TableContainer
                style={{
                  maxHeight: 448,
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Date</TableCell>
                      <TableCell align="center">Trade Type</TableCell>
                      <TableCell align="center">Symbol</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">Quote</TableCell>
                      <TableCell align="center">Total Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tradeDetails.map((trade) => (
                      <TableRow>
                        <TableCell align="center">
                          {dayjs(trade.date).format("MMM DD YYYY HH:mm")}
                        </TableCell>
                        <TableCell align="center">{trade.type}</TableCell>
                        <TableCell align="center">{trade.symbol}</TableCell>
                        <TableCell align="center">
                          {Math.abs(trade.quantity)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrency(trade.quote)}
                        </TableCell>
                        <TableCell align="center">
                          <PriceWrapper>
                            <PriceTypography
                              variant="body1"
                              quantity={trade.quantity}
                            >
                              {`${
                                trade.quantity > 0 ? "-" : "+"
                              }${formatCurrency(
                                Math.abs(trade.total).toFixed(2)
                              )}`}
                            </PriceTypography>
                          </PriceWrapper>
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
