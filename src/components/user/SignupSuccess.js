import React, { useState } from "react";
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

const SignupSuccessForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [enabledRememberMeCheckBox, setEnabledRememberMeCheckBox] = useState(
    false
  );
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
        "username",
        enabledRememberMeCheckBox ? username : ""
      );
      localStorage.setItem(
        "password",
        enabledRememberMeCheckBox ? password : ""
      );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!username) {
        setUsernameError("username is required.");
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

export const SignupSuccess = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <Typography color="primary" variant="h5">
          Signup successful! Please login.
        </Typography>
        <Typography variant="h2">Simvstr</Typography>
        <Typography varaint="body2">
          Welcome, please login to your account.
        </Typography>
        <SignupSuccessForm />
      </Box>
    </MainWrapper>
  );
};
