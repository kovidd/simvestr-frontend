import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

export const StockTradeConfirmation = ({
  open,
  handleClose,
  handleTrade,
  tradeDetails,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Review your trade</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please review the following trade:
          <br />
          {`${tradeDetails.trade_type.toUpperCase()} ${tradeDetails.quantity} ${
            tradeDetails.symbol
          } @ $${tradeDetails.quote} for $${(
            tradeDetails.quantity * tradeDetails.quote
          ).toFixed(2)}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleTrade} color="primary">
          Confirm Trade
        </Button>
      </DialogActions>
    </Dialog>
  );
};
