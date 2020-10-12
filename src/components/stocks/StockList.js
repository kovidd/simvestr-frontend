import React, { useState, useEffect, useLayoutEffect } from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MainWrapper } from "../ui";
import { GETRequest } from "../../services/api";
import { Redirect } from "react-router-dom";

const stocks = [
  { symbol: "APPL", name: "AppleInc" },
  {
    symbol: "C",
    name: "Citigroup Inc",
  },
  { symbol: "GM", name: "General Motors" },
  { symbol: "PG", name: "Procter & Gamle" },
  { symbol: "XOM", name: "Exxon Mobil Corp." },
];

const getStockDetails = (stock) => {
  if (stock === "APPL") {
    return {
      symbol: "APPL",
      name: "Apple Inc.",
      quote: {
        c: "100",
      },
    };
  } else {
    return null;
  }
};

export const StockList = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if ((token === "") | (token === "undefined")) {
      setLoading(false);
    }
  }, [token]);

  const [search, setSearch] = useState("");
  const [stockDetails, setStockDetails] = useState(null);
  useEffect(() => {
    if (search) {
      const stockDetails = getStockDetails(search);
      setStockDetails(stockDetails);
    }
  }, [search]);

  if (!loading) {
    return <Redirect to="/login" />;
  } else {
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
        {search && stockDetails && (
          <Box>
            <Typography variant="body1">{`Showing search results for ${search}:`}</Typography>
            <Typography variant="body1">
              Symbol: {stockDetails.symbol}
            </Typography>
            <Typography variant="body1">Name: {stockDetails.name}</Typography>
            <Typography variant="body1">
              Current Quote Price: {stockDetails.quote.c} USD/unit
            </Typography>
            <Typography variant="body1"></Typography>
          </Box>
        )}
      </MainWrapper>
    );
  }
};
