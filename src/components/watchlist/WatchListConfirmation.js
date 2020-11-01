import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

export const WatchlistRemoveConfirmation = ({
  open,
  handleClose,
  handleRemove,
  stockSymbol,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Remove from Watchlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove {stockSymbol} from your watchlist?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleRemove} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const WatchlistAddConfirmation = ({
  open,
  handleClose,
  stockSymbol,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add to Watchlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {stockSymbol} has been added to your watchlist.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
