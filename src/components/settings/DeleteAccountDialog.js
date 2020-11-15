import React, { useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { deleteAccount } from "../../services/delete";
import { NotificationContext } from "../ui/Notification";

export const DeleteAccountDialog = ({ open, setOpen }) => {
  const { setNotification } = useContext(NotificationContext);

  const handleClose = () => setOpen(false);

  const beginDeleteAccount = () => {
    async function callDeleteAccount() {
      const res = await deleteAccount();
      if (!res.error) {
        setNotification({
          open: true,
          message: `Account deleted successfully.`,
        });
        window.open("/login", "_self");
      } else {
        setNotification({
          open: true,
          message: `Error deleting account.`,
        });
      }
    }
    callDeleteAccount();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your account and all its associated data will be deleted. This
          includes your watchlist and portfolio. This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={beginDeleteAccount} color="inherit">
          Confirm Delete
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
