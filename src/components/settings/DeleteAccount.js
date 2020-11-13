import React, { useContext } from "react";
import { Box, Grid, Button } from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { deleteAccount } from "../../services/delete";
//import { NotificationContext } from "../ui/Notification";

const StyledH3 = styled.h3`
  font-size: 26px;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const StyledP = styled.p`
  font-size: 18px;
  margin: 20px 25% 0;
  text-align: center;
  padding: 0;
`;

export const DeleteAccount = () => {
  const history = useHistory();
  //const { setNotification } = useContext(NotificationContext);

  const beginDeleteAccount = () => {
    async function callDeleteAccount() {
      const res = await deleteAccount();
      // if (!res.error) {
      //   setNotification({
      //     open: true,
      //     message: `Account deleted successfully.`,
      //   });
      // } else {
      //   setNotification({
      //     open: true,
      //     message: `Error deleting account.`,
      //   });
      // }
    }
    callDeleteAccount();
  };

  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
        fontSize="10"
        align="center"
      ></Box>
      <StyledH3> DELETE ACCOUNT</StyledH3>
      <StyledP>
        Your account will be deleted
      </StyledP>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ bottom: "-25px" }}
              onClick={() => beginDeleteAccount()}
            >
              DELETE
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              style={{ bottom: "-25px" }}
              onClick={() => history.push("/settings")}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MainWrapper>
  );
};