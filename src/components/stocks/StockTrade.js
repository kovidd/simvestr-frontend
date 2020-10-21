import React, { useState, useEffect } from "react";
import {
  Select,
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";

const amountTypes = {
  quantity: "quantity",
  value: "value",
};

const tradeTypes = {
  buy: "buy",
  sell: "sell",
};

export const StockTrade = ({ quotePrice }) => {
  // TODO: get data from BE
  const availableUnits = 2042;
  const [tradeType, setTradeType] = useState(tradeTypes.buy);
  const [amount, setAmount] = useState(null);
  const [amountType, setAmountType] = useState(amountTypes.quantity);

  useEffect(() => {
    if (amountType === amountTypes.value) {
      setAmount((prev) => (prev !== null ? prev * quotePrice : prev));
    } else {
      setAmount((prev) => (prev !== null ? prev / quotePrice : prev));
    }
  }, [amountType, quotePrice]);

  const totalUnits =
    amount === null
      ? 0
      : amountType === amountTypes.quantity
      ? amount
      : amount / quotePrice;

  const estimatedValue = (totalUnits * quotePrice).toFixed(2);
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="trade type"
            name="trade"
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
          >
            <FormControlLabel
              value={tradeTypes.buy}
              control={<Radio />}
              label="Buy"
            />
            <FormControlLabel
              value={tradeTypes.sell}
              control={<Radio />}
              label="Sell"
            />
          </RadioGroup>
        </FormControl>
        {tradeType === tradeTypes.sell && (
          <Typography variant="body1">
            Available: {availableUnits} Units
          </Typography>
        )}
      </Box>
      <Box display="flex" alignItems="baseline">
        <FormControl style={{ marginRight: "0.5rem" }}>
          <Select
            name="amountType"
            value={amountType}
            onChange={(e) => setAmountType(e.target.value)}
            autoWidth
          >
            <MenuItem value={amountTypes.quantity}>Quantity</MenuItem>
            <MenuItem value={amountTypes.value}>Value ($)</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          name="amount"
          // label="Amount"
          style={{ flex: 1 }}
          InputProps={
            tradeType === tradeTypes.sell && {
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => {
                      setAmountType(amountTypes.quantity);
                      setAmount(availableUnits);
                    }}
                  >
                    MAX
                  </Button>
                </InputAdornment>
              ),
            }
          }
        />
      </Box>
      <Box textAlign="right">
        {amountType === amountTypes.value && (
          <Typography variant="body1" color="textSecondary">
            Total Units: {totalUnits}
          </Typography>
        )}
        <Typography variant="body1">
          Estimated Value: ${estimatedValue}
        </Typography>
        <Typography variant="body1">Brokerage Fee: $0.00</Typography>
      </Box>
      <Box mt="1rem" color={tradeType === tradeTypes.buy ? "green" : "red"}>
        <Button
          variant="outlined"
          onClick={() => alert(tradeType)}
          fullWidth
          color="inherit"
        >
          {tradeType.toUpperCase()}
        </Button>
      </Box>
    </>
  );
};
