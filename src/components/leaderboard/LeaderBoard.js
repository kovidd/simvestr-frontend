import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { LinkRouter } from "../ui";
import {
  leaderboardPosition,
  leaderboardAll,
} from "../../services/leaderboard";
import { formatCurrency } from "../../helpers";
import { NotificationContext } from "../ui/Notification";

export const LeaderBoard = () => {
  const [positionText, setText] = useState({ nominal: null, ordinal: "" });
  const [leaders, setLeaders] = useState([]);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    async function getLeaderboardPosition() {
      const res = await leaderboardPosition();
      if (!res.error) {
        setText(res.data);
      } else {
        setNotification({
          open: true,
          message: `Error getting leaderboard position`,
        });
      }
    }
    getLeaderboardPosition();
  }, [setNotification]);

  useEffect(() => {
    async function getLeaders() {
      const res = await leaderboardAll();
      if (!res.error) {
        var leaders = res.data;
        leaders.sort((a, b) => {
          if (a.value === b.value) {
            return a.id < b.id ? 1 : -1;
          }
          return a.value < b.value ? 1 : -1;
        });
        setLeaders(leaders);
      } else {
        setNotification({
          open: true,
          message: `Error loading leader board.`,
        });
      }
    }
    getLeaders();
  }, [setNotification]);

  const MY_PORTFOLIO_AT_POSITION = 4; // users portfolio will be at this position after scrollToPortfolio()

  // allow for portfolio to be at the top of the screen
  const positionOnScreen = Math.min(
    positionText["nominal"],
    MY_PORTFOLIO_AT_POSITION
  );

  const myPortfolio = useRef(null);

  const scrollToPortfolio = () => myPortfolio.current.scrollIntoView();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography variant="body2" align="center" gutterBottom>
        You are currently in {positionText["ordinal"]} position
      </Typography>
      <TableContainer
        style={{
          maxHeight: "500px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Portfolio Name</TableCell>
              <TableCell align="right">Total Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaders.map((item, index) => {
              const rowRef =
                positionText["nominal"] === index + positionOnScreen
                  ? myPortfolio
                  : null;
              const isMyPortfolio = positionText["nominal"] === index + 1;
              const bgColor = isMyPortfolio ? "rgba(0,127,127,0.1)" : "inherit";
              return (
                <TableRow
                  key={item.user + index}
                  ref={rowRef}
                  style={{ background: bgColor }}
                >
                  <TableCell align="left">{item.position}</TableCell>
                  <TableCell align="left">{item.user}</TableCell>
                  <TableCell align="left">
                    {isMyPortfolio ? (
                      <LinkRouter to="dashboard">{item.name}</LinkRouter>
                    ) : (
                      item.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {formatCurrency(item.value)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box pt="1rem">
        <Button variant="outlined" color="primary" onClick={scrollToPortfolio}>
          My Position
        </Button>
      </Box>
    </Box>
  );
};
