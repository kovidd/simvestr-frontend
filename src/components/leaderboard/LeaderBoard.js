import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  Typography,
} from "@material-ui/core";

import { MainWrapper } from "../ui";

import Portfolio from "./Portfolio";
import {
  leaderboardPosition,
  leaderboardAll,
} from "../../services/leaderboard";

const StyledH3 = styled.h3`
  font-size: 26px;
`;

const Button = styled.button`
  margin: 10px 0;
  width: 20%;
`;

export const LeaderBoard = () => {
  const [positionText, setText] = useState("");
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function getLeaderboardPosition() {
      const res = await leaderboardPosition();
      if (!res.error) {
        setText(res.data);
      } else {
        console.error("error getting the portfolio details");
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
        console.error("error getting the portfolio details");
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
          <Typography variant="h2" align="center">
            Simvestr Leader Board
          </Typography>
          <StyledH3>You are currently in {positionText} position</StyledH3>
          <div>
            <TableContainer
              ref={portfolioLeadersRef}
              style={{ maxHeight: 448, border: "2px solid #e4e4e4" }}
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
