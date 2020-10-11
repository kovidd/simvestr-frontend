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

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "password":
        setPassword(password);
        setConfirmPassword(confirmPassword);
        value.length < 8
          ? setPasswordError("Password must be at least 8 characters.")
          : setPasswordError("");
        value != confirmPassword
          ? setConfirmPasswordError("Passwords don't match.")
          : setConfirmPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPassword(confirmPassword);
        setPassword(password);
        value != password
          ? setConfirmPasswordError("Passwords don't match.")
          : setConfirmPasswordError("");
        break;
      default:
        break;
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPassword(password);
    setConfirmPassword(confirmPassword);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (
      password &&
      confirmPassword &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log(
        `--SUBMITTING-- 
      Password: ${password}`
      );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!password) {
        setPasswordError("Password is required.");
      }
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm password.");
      }
    }
  };

  return (
    <form>
      <Grid container spacing={2}>
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
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            className={confirmPasswordError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "confirmPassword")}
            onBlur={(e) => handleBlur(e, "confirmPassword")}
            fullWidth
          />
          {confirmPasswordError.length > 0 && (
            <Box className="errorMessage">{confirmPasswordError}</Box>
          )}
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className="btn"
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </Box>
    </form>
  );
};

export const ResetPassword = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <Typography variant="h2">Simvstr</Typography>
        <Typography varaint="body2">
          Here you can reset your password.
        </Typography>
        <Typography varaint="body2">Enter new password to reset.</Typography>
        <ResetPasswordForm />
      </Box>
    </MainWrapper>
  );
};
