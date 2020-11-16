import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NotificationContext } from "../ui/Notification";
import { removeStock, WatchlistContext } from "../../services/watchlist";

export const WatchlistRemoveConfirmation = ({ open, setOpen, symbol }) => {
  const { setWatchlist } = useContext(WatchlistContext);
  const { setNotification } = useContext(NotificationContext);

  const handleRemove = async () => {
    const res = await removeStock(symbol);
    if (!res.error) {
      setWatchlist((previous) =>
        previous.filter((stock) => symbol !== stock.symbol)
      );
      setNotification({
        open: true,
        message: `${symbol} removed from watchlist.`,
      });
    } else {
      setNotification({
        open: true,
        message: `Error removing ${symbol} from watchlist.`,
      });
    }
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Remove from Watchlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove {symbol} from your watchlist?
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

export const WatchlistAddConfirmation = ({ open, setOpen, symbol }) => {
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add to Watchlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {symbol} has been added to your watchlist.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
