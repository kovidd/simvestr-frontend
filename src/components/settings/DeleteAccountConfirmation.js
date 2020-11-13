import React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@material-ui/core";


export const DeleteAccountConfirmation = ({
    open,
    handleClose,
    handleDelete,
}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure? This cannot be undone.
        </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit" autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="inherit" autoFocus>
                    DELETE
                </Button>
            </DialogActions>
        </Dialog>
    );
};
