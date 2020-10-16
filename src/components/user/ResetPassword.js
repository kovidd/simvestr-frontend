import React, { useState } from "react";
import "../../index.css";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { MainWrapper } from "../ui";
import { PUTRequest } from "../../services/api";

const url = "http://localhost:5000";

const ResetPasswordForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
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
      case "otp":
        setOtp(otp);
        value.length !== 4
          ? setOtpError("OTP must be a 4 digits number.")
          : setOtpError("");
        break;
      case "password":
        setPassword(password);
        setConfirmPassword(confirmPassword);
        value.length < 8
          ? setPasswordError("Password must be at least 8 characters.")
          : setPasswordError("");
        value !== confirmPassword
          ? setConfirmPasswordError("Passwords don't match.")
          : setConfirmPasswordError("");
        break;
      case "confirmPassword":
        setConfirmPassword(confirmPassword);
        setPassword(password);
        value !== password
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
      case "username":
        setUsername(value);
        break;
      case "otp":
        const re = /^[0-9\b]+$/;
        if (e.target.value === "" || re.test(e.target.value)) {
          setOtp(e.target.value);
        }
        break;
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

    setUsername(username);
    setOtp(otp);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setUsernameError(usernameError);
    setOtpError(otpError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    if (
      username &&
      otp &&
      password &&
      confirmPassword &&
      !usernameError &&
      !otpError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log(
        `--SUBMITTING--
        Username: ${username}
        OTP: ${otp}
       Password: ${password}`
      );

      PUTRequest(
        url +
          "/api/v1/forgotuser/?username=" +
          username +
          "&password=" +
          password +
          " &OTP=" +
          otp
      ).then((data) => {
        if (data.error) {
          if (data.status === 448) {
            setMessage("Invalid OTP. Please try again.");
          }
        } else {
          setMessage("Password reset successful.");
        }
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!username) {
        setUsernameError("Username is required.");
      }
      if (!otp) {
        setOtpError("OTP is required.");
      }
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
        Here you can reset your password.
      </Typography>
      <Typography varaint="body2" align="center">
        Enter OTP and new password to reset.
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
            name="otp"
            label="OTP"
            value={otp}
            className={otpError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "otp")}
            onBlur={(e) => handleBlur(e, "otp")}
            fullWidth
          />
          {otpError.length > 0 && (
            <Box className="errorMessage">{otpError}</Box>
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
        <ResetPasswordForm />
      </Box>
    </MainWrapper>
  );
};
