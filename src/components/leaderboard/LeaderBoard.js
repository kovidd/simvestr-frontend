import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableContainer,
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

  const portfolioLeadersRef = React.createRef();

  const scrollToPortfolio = () => {
    const ITEM_HEIGHT = 64;
    const NUM_OF_ITEMS = 7;
    const amountToScroll =
      ITEM_HEIGHT *
      (positionText["nominal"] - Math.floor(NUM_OF_ITEMS / 2) - 1);
    portfolioLeadersRef.current.scrollTo(0, amountToScroll);
  };

  return (
    <MainWrapper>
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
          ref={portfolioLeadersRef}
          style={{
            maxHeight: 448,
            border: "2px solid #e4e4e4",
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              {leaders.map((item, index) => (
                <Portfolio
                  key={item.user}
                  position={item.position}
                  user={item.user}
                  name={item.name}
                  value={item.value}
                  thisUser={positionText["nominal"] === index + 1}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box pt="1rem">
          <Button
            variant="outlined"
            color="primary"
            onClick={scrollToPortfolio}
          >
            My Position
          </Button>
        </Box>
      </Box>
    </MainWrapper>
  );
};
