import React from "react";

import { Snackbar } from "@material-ui/core";

export const NotificationContext = React.createContext({
  notification: {
    open: false,
    message: "",
  },
  setNotification: () => {},
});

export const Notification = ({ open, message, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
};
