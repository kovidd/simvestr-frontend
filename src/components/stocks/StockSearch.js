import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { stockDetails } from "../../services/stock";

// For now use this until the BE is set up
const stocks = [
  { symbol: "AAPL", displaySymbol: "AAPL", name: "AppleInc" },
  { symbol: "GM", displaySymbol: "GM", name: "General Motors" },
];

export const StockSearch = ({ setDetails, setIsLoading }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getStockDetails(stockSymbol) {
      if (search) {
        setIsLoading(true);
        const res = await stockDetails(stockSymbol);
        if (!res.error) {
          setDetails({
            quote: Object.fromEntries(
              Object.entries(res.data.quote).map(([k, v]) => [k, parseFloat(v)])
            ),
            logo: res.data.logo,
            exchange: res.data.exchange.split(" ")[0],
            symbol: res.data.symbol,
            name: res.data.name,
            industry: res.data.industry,
            marketCapitalization: parseInt(res.data.marketCapitalization),
          });
        } else {
          console.error("error getting the stock details");
        }
        setIsLoading(false);
      }
    }
    getStockDetails(search);
  }, [search, setDetails, setIsLoading]);

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
