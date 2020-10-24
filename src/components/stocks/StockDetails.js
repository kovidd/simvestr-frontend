import React from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";

const StyledTableCell = styled(TableCell)`
  background-color: #eee;
  /* color: ${(props) => props.theme.palette.secondary.contrastText}; */
`;

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

const quoteText = {
  c: "Current Price",
  h: "Day High",
  l: "Day Low",
  o: "Open Price",
  pc: "Close Price",
};

export const StockDetails = ({ details }) => {
  if (!details) return null;
  const change = details.quote.c - details.quote.pc;
  const changePrec = Math.abs((change / details.quote.pc) * 100);
  return (
    <>
      <Box display="flex" alignItems="center">
        <img
          alt="Stock Logo"
          style={{ height: "36px", marginRight: "1rem" }}
          src={details.logo}
        />
        <Typography variant="h5">{details.name}</Typography>
      </Box>
      <Typography variant="subtitle1">
        {details.exchange}: {details.symbol} - {details.industry}
      </Typography>
      <PriceWrapper>
        <Typography variant="h6">{details.quote.c}</Typography>
        <Typography variant="body1" color="textSecondary">
          USD
        </Typography>
        <PriceTypography variant="body1" change={change}>{`${
          change > 0 ? "+" : ""
        }${change.toFixed(2)} (${changePrec.toFixed(2)}%)${
          change > 0 ? "↑" : "↓"
        }`}</PriceTypography>
      </PriceWrapper>
      <TableContainer>
        <Table size="small">
          <TableHead color="primary">
            <TableRow>
              <StyledTableCell align="center" colSpan={2}>
                {details.symbol} Summary
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {Object.entries(quoteText).map(([key, text]) => (
            <TableRow>
              <TableCell>{text}</TableCell>
              <TableCell>{details.quote[key]}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Market Cap (B)</TableCell>
            <TableCell>
              {details.marketCapitalization.toLocaleString()}
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <Box mt="1rem">
        <Button variant="outlined" fullWidth>
          Add To Watchlist
        </Button>
      </Box>
    </>
  );
};