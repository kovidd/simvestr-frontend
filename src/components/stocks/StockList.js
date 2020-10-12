import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MainWrapper } from "../ui";
import { GETRequest } from "../../services/api";
import axios from "axios";

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
  const [stockDetails, setStockDetails] = useState(null);
  const url ='http://127.0.0.1:5000/api/v1/stocks/finnhub/'+search;
  useEffect(() => {
    if (search) {
      //const stockDetails = getStockDetails(search);
      axios.get(url).then(function(response){
        const stockDetails = {current:response.data.c,previous:response.data.pc,logo:response.data.logo, quote:"100",exchange: response.data.exchange,symbol: response.data.ticker,name: response.data.name,industry: response.data.finnhubIndustry};
        setStockDetails(stockDetails);})

    }
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
      {search && stockDetails && (
        <Box>
          <Typography variant="body1">{`Showing search results for ${search}:`}</Typography>
          <Typography variant="body1">Name: {stockDetails.name}</Typography>
          <Typography variant="body1">Industry: {stockDetails.industry}</Typography>
          <Typography variant="body1">Exchange: {stockDetails.exchange}</Typography>
          <Typography variant="body1">Current Quote Price :  {stockDetails.current} </Typography>
          <Typography variant="body1">Previous Close Price: {stockDetails.previous} </Typography>
          <Typography variant="body1"></Typography>
          <Typography variant="body1"><img style={{height: "60px", marginTop:"20px"}} src={stockDetails.logo}/></Typography>
        </Box>
        
      )
      
}
    </MainWrapper>
  );
};
