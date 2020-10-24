import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { MainWrapper } from "../ui";
import { AuthContext } from "../../services/api";
import { UserContext } from "../../services/user";

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

const Search = styled.input`
  font-family: "VT323", monospace;
  font-size: 1rem;
  outline: none;
  border: none;
  flex-grow: 1;
  color: #007f7f;
`;

const initialTerminal = {
  isNew: true,
  search: "",
  result: "",
};

export const Homepage = () => {
  const history = useHistory();
  const { setAuth } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const [terminal, setTerminal] = useState([initialTerminal]);

  const updateTerminalAtIndex = (index, newValue) => {
    const newTerminal = terminal.map((el, innerIndex) =>
      index === innerIndex ? newValue : el
    );
    setTerminal(newTerminal);
  };

  const updateTerminalAtIndexAndPushNew = (index, newValue) => {
    let newTerminal = terminal.map((el, innerIndex) =>
      index === innerIndex ? newValue : el
    );
    newTerminal.push(initialTerminal);
    setTerminal(newTerminal);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.persist();
    setAuth({
      isAuthenticated: false,
      apiToken: null,
    });
    history.push("/login");
  };

  return (
    <MainWrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4">Simvestr v1.0</Typography>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <List>
        <ListItem disableGutters>
          <ListItemText>
            {`Welcome ${user.firstName}, select an option below to get started...`}{" "}
          </ListItemText>
        </ListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/stocks")}
        >
          <StyledListItemText>{`Search Stocks`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem button disableGutters>
          <StyledListItemText>{`Dashboard`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem
          button
          disableGutters
          onClick={() => history.push("/watchlist")}
        >
          <StyledListItemText>{`Watchlist`}</StyledListItemText>
        </StyledListItem>
        <StyledListItem button disableGutters>
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
          <form
            style={{ display: "flex" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              {terminal.map(({ search, result, isNew }, index) => (
                <>
                  <ListItemText>
                    <Box
                      display="inline"
                      mr="0.5rem"
                    >{`simvestr_v1.0 - ${user.firstName}$`}</Box>
                    {isNew ? (
                      <Search
                        autoFocus
                        value={search}
                        name="search"
                        type="text"
                        onChange={(e) => {
                          updateTerminalAtIndex(index, {
                            search: e.target.value,
                            result,
                            isNew,
                          });
                        }}
                        onBlur={(e) => {
                          e.preventDefault();
                          const target = e.currentTarget;
                          setTimeout(() => target.focus(), 5);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            if (search === "clear") {
                              setTerminal([initialTerminal]);
                            } else {
                              updateTerminalAtIndexAndPushNew(index, {
                                search,
                                result: "awesome!",
                                isNew: false,
                              });
                            }
                          }
                        }}
                      ></Search>
                    ) : (
                      <Typography
                        display="inline"
                        variant="body1"
                        color="primary"
                      >
                        {`${search}`}
                      </Typography>
                    )}
                  </ListItemText>
                  {result && <ListItemText>{result}</ListItemText>}
                </>
              ))}
            </div>
          </form>
        </ListItem>
      </List>
    </MainWrapper>
  );
};
