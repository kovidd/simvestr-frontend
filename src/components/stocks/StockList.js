import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  Box,
  Grid,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MainWrapper } from "../ui";
import { stockDetails } from "../../services/stock";

const StockSearch = ({ setDetails }) => {
  const [search, setSearch] = useState("");

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

const StockDetails = ({ details }) => {
  return (
    <Box>
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
  );
};

const StockTrade = () => {
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState(null);
  const [amountType, setAmountType] = useState("amount");

  return (
    <Box>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="trade type"
          name="trade"
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value)}
        >
          <FormControlLabel value="buy" control={<Radio />} label="Buy" />
          <FormControlLabel value="sell" control={<Radio />} label="Sell" />
        </RadioGroup>
      </FormControl>
      <Box display="flex" alignItems="baseline">
        <FormControl>
          <Select
            name="amountType"
            value={amountType}
            onChange={(e) => setAmountType(e.target.value)}
          >
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="total">Total</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          label="Amount"
          fullWidth
        />
      </Box>
    </Box>
  );
};
export const StockList = () => {
  const [details, setDetails] = useState(null);

  return (
    <MainWrapper>
      <StockSearch setDetails={setDetails} />
      {details && (
        <Grid container>
          <Grid item xs={6}>
            <StockDetails details={details} />
          </Grid>
          <Grid item xs={6}>
            <Box>
              <div>Stock Chart</div>
            </Box>
            <Box>
              <StockTrade />
            </Box>
          </Grid>
        </Grid>
      )}
    </MainWrapper>
  );
};
