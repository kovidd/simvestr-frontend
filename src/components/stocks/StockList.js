import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MainWrapper } from "../ui";
import { stockDetails } from "../../services/stock";

const stocks = [
  { symbol: "AAPL", name: "AppleInc" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "F", name: "Ford" },
  {
    symbol: "C",
    name: "Citigroup Inc",
  },
  { symbol: "GM", name: "General Motors" },
  { symbol: "PG", name: "Procter & Gamle" },
  { symbol: "XOM", name: "Exxon Mobil Corp." },
];

export const StockList = () => {
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function getStockDetails(stockSymbol) {
      if (search) {
        const res = await stockDetails(stockSymbol);
        if (!res.error) {
          setDetails({
            current: res.data.c,
            previous: res.data.pc,
            logo: res.data.logo,
            exchange: res.data.exchange,
            symbol: res.data.ticker,
            name: res.data.name,
            industry: res.data.finnhubIndustry,
          });
        } else {
          console.log("error getting the stock details");
        }
      }
    }
    getStockDetails(search);
  }, [search]);

  return (
    <MainWrapper>
      <Autocomplete
        freeSolo
        id="stock-search"
        disableClearable
        value={search}
        onChange={(_, newValue) => setSearch(newValue)}
        options={stocks.map((option) => option.symbol)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Stocks"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      {search && details && (
        <Box>
          <Typography variant="body1">{`Showing search results for ${search}:`}</Typography>
          <Typography variant="body1">Name: {details.name}</Typography>
          <Typography variant="body1">Industry: {details.industry}</Typography>
          <Typography variant="body1">Exchange: {details.exchange}</Typography>
          <Typography variant="body1">
            Current Quote Price : {details.current}{" "}
          </Typography>
          <Typography variant="body1">
            Previous Close Price: {details.previous}{" "}
          </Typography>
          <Typography variant="body1"></Typography>
          <Typography variant="body1">
            <img
              alt="Stock Logo"
              style={{ height: "60px", marginTop: "20px" }}
              src={details.logo}
            />
          </Typography>
        </Box>
      )}
    </MainWrapper>
  );
};
