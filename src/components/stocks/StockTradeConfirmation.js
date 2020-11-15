import React from "react";
import styled from "styled-components";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@material-ui/core";

const StyledButton = styled(Button)`
  min-width: 8rem;
`;

const StyledCircularProgress = styled(CircularProgress)`
  margin-left: 5px;
`;

export const StockTradeConfirmation = ({
  open,
  handleClose,
  handleTrade,
  isExecuting,
  isComplete,
  tradeDetails,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Review your trade</DialogTitle>
      <DialogContent>
        {isComplete ? (
          <DialogContentText>
            Trade executed successfully:
            <br />{" "}
            {`${tradeDetails.trade_type.toUpperCase()} ${
              tradeDetails.quantity
            } ${tradeDetails.symbol} @ $${tradeDetails.quote} for $${(
              tradeDetails.quantity * tradeDetails.quote
            ).toFixed(2)}`}
          </DialogContentText>
        ) : (
          <DialogContentText>
            Please review the following trade:
            <br />
            {`${tradeDetails.trade_type.toUpperCase()} ${
              tradeDetails.quantity
            } ${tradeDetails.symbol} @ $${tradeDetails.quote} for $${(
              tradeDetails.quantity * tradeDetails.quote
            ).toFixed(2)}`}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {isComplete ? (
          <Button onClick={handleClose} color="primay">
            Close
          </Button>
        ) : (
          <>
            <Button onClick={handleClose} color="inherit" autoFocus>
              Cancel
            </Button>
            <StyledButton onClick={handleTrade} color="primary">
              {isExecuting ? "Executing Trade" : "Confirm Trade"}
              {isExecuting && <StyledCircularProgress size={20} />}
            </StyledButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};
