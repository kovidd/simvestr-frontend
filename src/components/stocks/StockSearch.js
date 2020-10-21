import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
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

export const StockSearch = ({ setDetails }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getStockDetails(stockSymbol) {
      if (search) {
        const res = await stockDetails(stockSymbol);
        if (!res.error) {
          setDetails({
            quote: Object.fromEntries(
              Object.entries(res.data.quote).map(([k, v]) => [k, parseFloat(v)])
            ),
            logo: res.data.logo,
            exchange: res.data.exchange.split(" ")[0],
            symbol: res.data.ticker,
            name: res.data.name,
            industry: res.data.finnhubIndustry,
            marketCapitalization: parseInt(res.data.marketCapitalization),
          });
        } else {
          console.log("error getting the stock details");
        }
      }
    }
    getStockDetails(search);
  }, [search, setDetails]);

  return (
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
  );
};
