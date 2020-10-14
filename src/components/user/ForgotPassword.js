import React, { useState } from "react";
import "../../index.css";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { GETRequest } from "../../services/api";

const url = "http://localhost:5000";

const ForgotPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [message, setMessage] = useState("");

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(username);
        value.length < 8
          ? setUsernameError("Username must be at least 8 characters.")
          : setUsernameError("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUsername(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsername(username);
    setUsernameError(usernameError);

    if (username && !usernameError) {
      console.log(`
      --SUBMITTING--
      Username: ${username}`);

      GETRequest(url + "/api/v1/forgotuser/?username=" + username).then(
        (data) => {
          if (data.error) {
            if (data.status === 449) {
              setMessage("User does not exist. Please try again.");
            }
          } else {
            setMessage("An email has been sent to you.");
          }
        }
      );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!username) {
        setUsernameError("Username is required.");
      }
    }
  };

  return (
    <form>
      <Box
        display="flex"
        justifyContent="center"
        color="#007f7f"
        fontSize="h5.fontSize"
      >
        {message}
      </Box>
      <Typography variant="h2" align="center">
        Simvstr
      </Typography>
      <Typography varaint="body2" align="center">
        Enter your username and we will send through an email with a one-time
        password (OTP).
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="username"
            label="Username"
            value={username}
            className={usernameError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "username")}
            onBlur={(e) => handleBlur(e, "username")}
            fullWidth
          />
          {usernameError.length > 0 && (
            <Box className="errorMessage">{usernameError}</Box>
          )}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          className="btn"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send Request
        </Button>
      </Box>
    </form>
  );
};

export const ForgotPassword = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <ForgotPasswordForm />
      </Box>
    </MainWrapper>
  );
};
