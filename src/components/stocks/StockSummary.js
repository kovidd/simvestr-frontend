import React from "react";
import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { formatCurrency } from "../../helpers";

const StyledTableCell = styled(TableCell)`
  background-color: #eee;
  /* color: ${(props) => props.theme.palette.secondary.contrastText}; */
`;

const quoteText = {
  c: "Current Price",
  h: "Day High",
  l: "Day Low",
  o: "Open Price",
  pc: "Close Price",
};

export const StockSummary = ({ details }) => (
  <TableContainer>
    <Table size="small">
      <TableHead color="primary">
        <TableRow>
          <StyledTableCell align="center" colSpan={4}>
            {details.symbol} Summary
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.entries(quoteText).map(([key, text]) => (
          <TableRow key={key}>
            <TableCell>{text}</TableCell>
            <TableCell>{formatCurrency(details.quote[key])}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>Market Cap (B)</TableCell>
          <TableCell>{details.marketCapitalization.toLocaleString()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
