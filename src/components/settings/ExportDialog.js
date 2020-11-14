import React, { useContext } from "react";
import { saveAs } from "file-saver";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { exportPortfolio } from "../../services/export";
import { NotificationContext } from "../ui/Notification";

export const ExportDialog = ({ open, setOpen }) => {
  const { setNotification } = useContext(NotificationContext);
  const handleClose = () => setOpen(false);

  const beginExport = () => {
    async function callExportfolio() {
      const res = await exportPortfolio();
      if (!res.error) {
        const blob = res.data;
        saveAs(blob, "portfolio.xlsx");
      } else {
        setNotification({
          open: true,
          message: `Error exporting portfolio.`,
        });
      }
      handleClose();
    }
    callExportfolio();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Export Portfolio</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your portfolio data will be downloaded in XLSX format to your download
          directory.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={beginExport} color="inherit">
          Export
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
