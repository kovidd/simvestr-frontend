import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Typography,
  Button,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import Portfolio from "./Portfolio";
import {
  leaderboardPosition,
  leaderboardAll,
} from "../../services/leaderboard";
import { NotificationContext } from "../ui/Notification";

export const LeaderBoard = () => {
  const [positionText, setText] = useState("");
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
          message: `Error getting leader board position`,
        });
      }
    }
    getLeaderboardPosition();
  }, []);

  useEffect(() => {
    async function getLeaders() {
      const res = await leaderboardAll();
      if (!res.error) {
        var leaders = res.data;
        leaders.sort((a, b) => (a.position > b.position ? 1 : -1));
        setLeaders(leaders);
      } else {
        setNotification({
          open: true,
          message: `Error loading leader board.`,
        });
      }
    }
    getLeaders();
  }, []);

  const portfolioLeadersRef = React.createRef();

  const scrollToPortfolio = () => {
    const ITEM_HEIGHT = 64;
    const NUM_OF_ITEMS = 7;
    const amountToScroll =
      ITEM_HEIGHT *
      (positionText.slice(0, -2) - Math.floor(NUM_OF_ITEMS / 2) - 1);
    portfolioLeadersRef.current.scrollTo(0, amountToScroll);
  };

  return (
    <MainWrapper>
      <Box height="100%" alignItems="center" p="2rem" paddingTop="0">
        <div align="center">
          <Typography variant="h4" align="center">
            Simvestr Leader Board
          </Typography>
          <Typography variant="h6" align="center">
            You are currently in {positionText} position
          </Typography>
          <div>
            <TableContainer
              ref={portfolioLeadersRef}
              style={{
                maxHeight: 448,
                border: "2px solid #e4e4e4",
              }}
            >
              {leaders.map((item, index) => (
                <Table aria-label="simple table">
                  <TableBody key={index}>
                    <Portfolio
                      position={item.position}
                      user={item.user}
                      name={item.name}
                      value={item.value}
                      thisUser={item.position == positionText.slice(0, -2)}
                    />
                  </TableBody>
                </Table>
              ))}
            </TableContainer>
            <Button
              variant="outlined"
              color="primary"
              style={{ bottom: "-15px" }}
              onClick={() => {
                scrollToPortfolio();
              }}
            >
              My Portfolio
            </Button>
          </div>
        </div>
      </Box>
    </MainWrapper>
  );
};
