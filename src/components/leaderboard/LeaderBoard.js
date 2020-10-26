import React, { useState, useEffect} from "react";
import styled from "styled-components";
import "../../index.css";
import {
  Box,
  Typography,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { useLocation } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Portfolio from "./Portfolio";
import { leaderboardPosition, leaderboardLeaders } from "../../services/portfolio";

const StyledH3 = styled.h3` font-size:26px;`;

export const LeaderBoard = () => {

  const [positionText, setText] = useState("");
  const [leaders, setLeaders] = useState([]);

  const NUM_DISPLAYED_PORTFOLIOS = 6;

  const location = useLocation();
  const user_id = location.state.user_id;

  useEffect(() => {
      async function getLeaderboardPosition(user_id) {
        if (user_id) {
          const res = await leaderboardPosition(user_id);
          if (!res.error) {
            setText(res.data);
          } else {
            console.error("error getting the portfolio details");
          }
        }
      }
      getLeaderboardPosition(user_id);
    }, [user_id]);

  useEffect(() => {
    async function getLeaders(NUM_DISPLAYED_PORTFOLIOS) {
      if (NUM_DISPLAYED_PORTFOLIOS) {
        const res = await leaderboardLeaders(NUM_DISPLAYED_PORTFOLIOS);
        if (!res.error) {
          var leaders = res.data;
          leaders.sort((a,b) => (a.value < b.value) ? 1 : -1);
          setLeaders(leaders);
        } else {
          console.error("error getting the portfolio details");
        }
      }
    }
    getLeaders(NUM_DISPLAYED_PORTFOLIOS);
  }, [leaders]);

  var count = 0;
  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
      >
        <div align="center" >
          <Typography variant="h2" align="center">
            Simvestr Leader Board
          </Typography>
          <StyledH3> You are currently in {positionText} position </StyledH3>
          <div>
            {leaders.map(item => {
              count += 1;
              return (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody key={item.id} >
                    <Portfolio position={count} user={item.user} name={item.name} value={item.value}/>
                  </TableBody>
                </Table>
              </TableContainer>
            )})}
          </div>
        </div>
      </Box>
    </MainWrapper>
  );
};
