import React, { useState, useEffect } from "react";
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
  leaderboardLeaders,
} from "../../services/leaderboard";

const StyledH3 = styled.h3`
  font-size: 26px;
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
      const res = await leaderboardLeaders();
      if (!res.error) {
        var leaders = res.data;
        leaders.sort((a, b) => (a.value < b.value ? 1 : -1));
        setLeaders(leaders);
      } else {
        console.error("error getting the portfolio details");
      }
    }
    getLeaders();
  }, [leaders]);

  return (
    <MainWrapper>
      <Box height="100%" alignItems="center" p="2rem" paddingTop="0">
        <div align="center">
          <Typography variant="h2" align="center">
            Simvestr Leader Board
          </Typography>
          <StyledH3>You are currently in {positionText} position</StyledH3>
          <div>
            {leaders.map((item, index) => (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody key={item.id}>
                    <Portfolio
                      position={index + 1}
                      user={item.user}
                      name={item.name}
                      value={item.value}
                    />
                  </TableBody>
                </Table>
              </TableContainer>
            ))}
          </div>
        </div>
      </Box>
    </MainWrapper>
  );
};
