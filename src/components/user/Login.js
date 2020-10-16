import React, { useState, useEffect } from "react";
import "../../index.css";
import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import { GETRequest } from "../../services/api";

const url = "http://localhost:5000";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enabledRememberMeCheckBox, setEnabledRememberMeCheckBox] = useState(
    false
  );
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [message, setMessage] = useState("");

  useEffect((e) => {
    const rememberMe = localStorage.getItem("rememberMe");
    if (rememberMe === "true") {
      const username = localStorage.getItem("remember_username");
      setUsername(username);
      const password = localStorage.getItem("remember_password");
      setPassword(password);
      setEnabledRememberMeCheckBox(rememberMe);
    }
  }, []);

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
      case "password":
        setPassword(password);
        value.length < 8
          ? setPasswordError("Password must be at least 8 characters.")
          : setPasswordError("");
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
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.persist();

    setUsername(username);
    setPassword(password);
    setUsernameError(usernameError);
    setPasswordError(passwordError);

    if (username && password && !usernameError && !passwordError) {
      console.log(
        `--SUBMITTING-- 
      Username: ${username} 
      Password: ${password}`
      );
      localStorage.setItem("rememberMe", enabledRememberMeCheckBox);
      localStorage.setItem(
        "remember_username",
        enabledRememberMeCheckBox ? username : ""
      );
      localStorage.setItem(
        "remember_password",
        enabledRememberMeCheckBox ? password : ""
      );

      GETRequest(
        url + "/api/v1/token/?username=" + username + "&password=" + password
      ).then((data) => {
        if (data.error) {
          if (data.status === 442) {
            setMessage("Incorrect Password. Please try again.");
            localStorage.setItem("token", "");
          } else if (data.status === 449) {
            setMessage("User does not exist. Please try again.");
            localStorage.setItem("token", "");
          }
        } else if (!data.error) {
          console.log(data);
          setMessage("Successful login.");
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("loggedUser", username);
          window.location.replace("/");
        }
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!username) {
        setUsernameError("Username is required.");
      }
      if (!password) {
        setPasswordError("Password is required.");
      }
    }
  };

  const handleRememberMeClick = (e) => {
    e.persist();
    setEnabledRememberMeCheckBox(!enabledRememberMeCheckBox);
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
        Welcome back, please login to your account.
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
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            label="Password"
            value={password}
            className={passwordError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "password")}
            onBlur={(e) => handleBlur(e, "password")}
            fullWidth
          />
          {passwordError.length > 0 && (
            <Box className="errorMessage">{passwordError}</Box>
          )}
          <Box display="flex" justifyContent="flex-end">
            <Link href="./forgotpassword">Forgot Password?</Link>
          </Box>
        </Grid>
        <Box display="flex" flexDirection="column">
          <FormControlLabel
            control={<Checkbox name="rememberMe" color="primary" />}
            label="Remember me"
            checked={enabledRememberMeCheckBox}
            onClick={handleRememberMeClick}
          />
        </Box>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Typography>
          Not a member? <Link href="./signup">Sign Up</Link>
        </Typography>
      </Box>
    </form>
  );
};

export const Login = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <LoginForm />
      </Box>
    </MainWrapper>
  );
};
