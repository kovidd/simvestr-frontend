import React, { useState } from "react";
import styled from "styled-components";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { MainWrapper } from "../ui";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

const StyledListItemText = styled(ListItemText)`
  & > :before {
    display: inline-block;
    content: "";
    border-top: 1px solid black;
    width: 0.7rem;
    transform: translateY(-4px);
    margin-right: 3px;
  }
`;

const StyledListItem = styled(ListItem)`
  border-left: 1px solid black;
  &:hover {
    color: #007f7f;
  }
`;

export const AccountSettings = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DeleteAccountDialog open={open} setOpen={setOpen} />
      <MainWrapper>
        <List>
          <ListItem disableGutters>
            <ListItemText>
              {`Select one of the options to update your account settings.`}{" "}
            </ListItemText>
          </ListItem>
          <StyledListItem
            button
            disableGutters
            onClick={() => history.push("/settings/personaldetails")}
          >
            <StyledListItemText>{`Personal Details`}</StyledListItemText>
          </StyledListItem>
          <StyledListItem
            button
            disableGutters
            onClick={() => history.push("/settings/password")}
          >
            <StyledListItemText>{`Password`}</StyledListItemText>
          </StyledListItem>
          <StyledListItem
            button
            disableGutters
            onClick={() => history.push("/settings/export")}
          >
            <StyledListItemText>{`Export Portfolio`}</StyledListItemText>
          </StyledListItem>
          <StyledListItem button disableGutters onClick={() => setOpen(true)}>
            <StyledListItemText>{`Delete Account`}</StyledListItemText>
          </StyledListItem>
          <StyledListItem
            button
            disableGutters
            onClick={() =>
              history.push("/settings/terms-and-conditions-settings")
            }
          >
            <StyledListItemText>{`Terms and Conditions`}</StyledListItemText>
          </StyledListItem>
          <StyledListItem
            button
            disableGutters
            onClick={() => history.push("/settings/faq")}
          >
            <StyledListItemText>{`FAQ`}</StyledListItemText>
          </StyledListItem>
          <ListItem disableGutters>
            <form
              style={{ display: "flex" }}
              onSubmit={(e) => e.preventDefault()}
            ></form>
          </ListItem>
        </List>
      </MainWrapper>
    </div>
  );
};
