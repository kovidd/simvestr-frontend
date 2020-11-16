import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, ListItemText, Typography } from "@material-ui/core";
import styled from "styled-components";

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

export const Terminal = ({ user }) => {
  const history = useHistory();
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

  return (
    <form style={{ display: "flex" }} onSubmit={(e) => e.preventDefault()}>
      <div>
        {terminal.map(({ search, result, isNew }, index) => (
          <React.Fragment key={search + index}>
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
                      } else if (
                        search.toLowerCase() === "search stocks" ||
                        search.toLowerCase() === "search" ||
                        search.toLowerCase() === "stocks"
                      ) {
                        history.push("/stocks");
                      } else if (search.toLowerCase() === "dashboard") {
                        history.push("/");
                      } else if (search.toLowerCase() === "watchlist") {
                        history.push("/watchlist");
                      } else if (
                        search.toLowerCase() === "historical trades" ||
                        search.toLowerCase() === "trades"
                      ) {
                        history.push("/trades");
                      } else if (search.toLowerCase() === "leaderboard") {
                        history.push("/leaderboard");
                      } else if (search.toLowerCase() === "settings") {
                        history.push("/settings");
                      } else {
                        updateTerminalAtIndexAndPushNew(index, {
                          search,
                          result:
                            "Try typing a command like: 'search', 'dashboard', 'watchlist', etc!",
                          isNew: false,
                        });
                      }
                    }
                  }}
                ></Search>
              ) : (
                <Typography display="inline" variant="body1" color="primary">
                  {`${search}`}
                </Typography>
              )}
            </ListItemText>
            {result && <ListItemText>{result}</ListItemText>}
          </React.Fragment>
        ))}
      </div>
    </form>
  );
};
