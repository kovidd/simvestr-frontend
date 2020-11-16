import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { ExportDialog } from "./ExportDialog";

export const AccountSettings = () => {
  const history = useHistory();
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);

  return (
    <div>
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        setOpen={setOpenDeleteAccountDialog}
      />
      <ExportDialog open={openExportDialog} setOpen={setOpenExportDialog} />
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText>
            Select one of the options to update your account settings.
          </ListItemText>
        </ListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/settings/personaldetails")}
        >
          <StyledListItemText>Personal Details</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/settings/password")}
        >
          <StyledListItemText>Change Password</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => setOpenExportDialog(true)}
        >
          <StyledListItemText>Export Portfolio</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => setOpenDeleteAccountDialog(true)}
        >
          <StyledListItemText>Delete Account</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() =>
            history.push("/settings/terms-and-conditions-settings")
          }
        >
          <StyledListItemText>Terms and Conditions</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/settings/faq")}
        >
          <StyledListItemText>FAQ</StyledListItemText>
        </StyledListItem>
      </List>
    </div>
  );
};
