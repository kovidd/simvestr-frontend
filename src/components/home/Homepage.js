import React, { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../services/api";
import { UserContext } from "../../services/user";
import {
  PortfolioContext,
  getPortfolioDetails,
} from "../../services/portfolio";
import { logout } from "../../services/user";
import { NotificationContext } from "../ui/Notification";
import { Terminal } from "./Terminal";
import { StyledListItemText, StyledListItem } from "./ui";

export const Homepage = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);
  const { setPortfolio } = useContext(PortfolioContext);

  const { setNotification } = useContext(NotificationContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    e.persist();
    const res = await logout();
    if (!res.error) {
      setAuth({
        isAuthenticated: false,
      });
      history.push("/login");
    } else {
      setNotification({
        open: true,
        message: `Error logging out.`,
      });
    }
  };

  useEffect(() => {
    getPortfolioDetails(setPortfolio);
  }, [setPortfolio]);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="inline-flex" alignItems="center">
          <Box mr="1rem">
            <img src={logo} alt="Simvestr Logo" height="60" width="60" />
          </Box>
          <Typography variant="h4">Simvestr v1.0</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText>
            {`Welcome ${user.firstName} ${user.lastName}, select an option below to get started...`}{" "}
          </ListItemText>
        </ListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/stocks")}
        >
          <StyledListItemText>{`Search Stocks`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/dashboard")}
        >
          <StyledListItemText>{`Dashboard`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/watchlist")}
        >
          <StyledListItemText>{`Watchlist`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/trades")}
        >
          <StyledListItemText>{`Historical Trades`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/leaderboard")}
        >
          <StyledListItemText>{`Leaderboard`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/settings")}
        >
          <StyledListItemText>{`Settings`}</StyledListItemText>
        </StyledListItem>
        <ListItem disableGutters>
          <Terminal user={user} />
        </ListItem>
      </List>
    </Box>
  );
};
