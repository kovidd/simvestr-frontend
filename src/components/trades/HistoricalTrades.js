import React, { useState, useEffect, useContext } from "react";
import * as dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
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
  LinearProgress,
} from "@material-ui/core";
import { MainWrapper, LinkRouter, PriceTableCell } from "../ui";
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

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

export const HistoricalTrades = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setNotification } = useContext(NotificationContext);
  console.log(transactions);
  useEffect(() => {
    async function getHistoricalTrades() {
      const res = await getTrades();
      if (!res.error) {
        setIsLoading(true);
        setTransactions(
          res.data.transactions
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((transaction) => ({
              symbol: transaction.symbol,
              quote: transaction.quote,
              timestamp: transaction.timestamp * 1000, // convert to ms
              quantity: Math.abs(transaction.quantity),
              fee: transaction.fee,
              type: transaction.quantity > 0 ? "buy" : "sell",
              total: Math.abs(transaction.quantity * transaction.quote),
            }))
        );
      } else {
        setNotification({
          open: true,
          message: `Error loading historical trades.`,
        });
      }
      setIsLoading(false);
    }
    getHistoricalTrades();
  }, [setNotification, setTransactions, setIsLoading]);

  return (
    <>
      <MainWrapper>
        <Box mt="1rem">
          {isLoading ? (
            <LinearProgress />
          ) : (
            transactions && (
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Symbol</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Trade Type</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Quote</TableCell>
                      <TableCell align="right">Total Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.map((trade) => (
                      <TableRow>
                        <TableCell>
                          <LinkRouter to={`stocks/${trade.symbol}`}>
                            {trade.symbol}
                          </LinkRouter>
                        </TableCell>
                        <TableCell>
                          {dayjs
                            .tz(trade.timestamp)
                            .format("MMM DD YYYY HH:mm")}
                        </TableCell>
                        <PriceTableCell change={trade.type === "buy" ? 1 : -1}>
                          {trade.type.toUpperCase()}
                        </PriceTableCell>
                        <TableCell align="right">{trade.quantity}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(trade.quote)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(trade.total)}
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
