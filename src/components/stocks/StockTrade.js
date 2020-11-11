import React, { useState, useEffect, useContext } from "react";
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
import {
  PortfolioContext,
  getPortfolioDetails,
} from "../../services/portfolio";
import { StockTradeConfirmation } from "./StockTradeConfirmation";
import { marketOrder } from "../../services/stock";

const amountTypes = {
  quantity: "quantity",
  value: "value",
};

const tradeTypes = {
  buy: "buy",
  sell: "sell",
};

export const StockTrade = ({ symbol, quotePrice }) => {
  const [open, setOpen] = useState(false);
  const { portfolio, setPortfolio } = useContext(PortfolioContext);

  var availableUnits = 0;
  Object.entries(portfolio.portfolio).map(async function ([k, v]) {
    if (symbol === portfolio.portfolio[k].stock) {
      availableUnits = portfolio.portfolio[k].quantity;
    }
  });

  const availableBalance = portfolio.balance;

  const [tradeType, setTradeType] = useState(tradeTypes.buy);
  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState(amountTypes.quantity);

  useEffect(() => {
    if (amountType === amountTypes.value) {
      setAmount((prev) => (prev !== "" ? prev * quotePrice : prev));
    } else {
      setAmount((prev) => (prev !== "" ? Math.floor(prev / quotePrice) : prev));
    }
  }, [amountType, quotePrice]);

  const totalUnits = Math.floor(
    amount === null
      ? 0
      : amountType === amountTypes.quantity
      ? amount
      : amount / quotePrice
  );

  const estimatedValue = (totalUnits * quotePrice).toFixed(2);
  const excessAmount =
    tradeType === tradeTypes.buy
      ? estimatedValue > availableBalance
      : totalUnits > availableUnits;

  const tradeDetails = {
    symbol,
    quote: quotePrice,
    trade_type: tradeType,
    quantity: parseInt(totalUnits),
  };

  const handleTrade = async () => {
    const res = await marketOrder(tradeDetails);
    if (!res.error) {
      await getPortfolioDetails(setPortfolio);
      setOpen(false);
      setAmount("");
    } else {
      console.error("Error executing the trade");
    }
  };

  return (
    <>
      <StockTradeConfirmation
        open={open}
        handleClose={() => setOpen(false)}
        handleTrade={handleTrade}
        tradeDetails={tradeDetails}
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" display="inline">
          Trade {symbol} shares
        </Typography>
      </Box>
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
              control={<Radio color="primary" />}
              label="Buy"
            />
            <FormControlLabel
              value={tradeTypes.sell}
              control={<Radio color="primary" />}
              label="Sell"
              disabled={availableUnits === 0}
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body1">
          Available:{" "}
          {tradeType === tradeTypes.sell
            ? `${availableUnits} Units`
            : `$${availableBalance.toFixed(2)}`}
        </Typography>
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
          type="number"
          value={amount}
          onChange={(e) => {
            Math.abs(e.target.value) > 0
              ? setAmount(Math.abs(e.target.value))
              : setAmount(e.target.value);
          }}
          onBlur={(e) =>
            amountType === amountTypes.quantity &&
            setAmount(Math.floor(e.target.value))
          }
          name="amount"
          style={{ flex: 1 }}
          min="0"
          InputProps={
            tradeType === tradeTypes.sell
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => {
                          setAmount(
                            amountType === amountTypes.quantity
                              ? availableUnits
                              : availableUnits * quotePrice
                          );
                          // setAmountType(amountTypes.quantity);
                        }}
                      >
                        MAX
                      </Button>
                    </InputAdornment>
                  ),
                }
              : null
          }
          inputProps={{
            min: "0",
          }}
        />
      </Box>
      <Box textAlign="right">
        {amountType === amountTypes.value && (
          <Typography variant="body1" color="textSecondary">
            Total Units: {totalUnits}
          </Typography>
        )}
        <Typography variant="body1" color={excessAmount ? "error" : "initial"}>
          Estimated Value: ${estimatedValue}
        </Typography>
        <Typography variant="body1">Brokerage Fee: $0.00</Typography>
      </Box>
      <Box mt="1rem" color={tradeType === tradeTypes.buy ? "green" : "red"}>
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          fullWidth
          color="inherit"
          disabled={excessAmount}
        >
          {tradeType.toUpperCase()}
        </Button>
      </Box>
    </>
  );
};
