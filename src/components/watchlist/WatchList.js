import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { MainWrapper } from "../ui";

export const WatchList = () => {
  const [watchedStocks, setWatchedStocks] = useState([]);

  useEffect(() => {
    setWatchedStocks([
      {
        symbol: "APPL",
        company: "Apple Inc.",
        currentprice: 40,
        lastprice: 30,
        daychange: -10,
        details: "",
        remove: "",
      },
      {
        symbol: "MSFT",
        company: "Microsoft",
        currentprice: 40,
        lastprice: 30,
        daychange: -10,
        details: "",
        remove: "",
      },
    ]);
  }, []);

  return (
    <>
      <MainWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Symbol</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Current Price (USD)</TableCell>
              <TableCell align="center">Last Price (USD)</TableCell>
              <TableCell align="center">Day Change (%)</TableCell>
              <TableCell align="center"> </TableCell>
              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {watchedStocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell component="th" scope="row">
                  {stock.symbol}
                </TableCell>
                <TableCell align="center">{stock.company}</TableCell>
                <TableCell align="center">{stock.currentprice}</TableCell>
                <TableCell align="center">{stock.lastprice}</TableCell>
                <TableCell align="center">{stock.daychange}</TableCell>
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
