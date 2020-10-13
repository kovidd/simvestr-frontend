import React, { useState } from "react";
import "../../index.css";
import { useHistory } from "react-router-dom";
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
import { POSTRequest } from "../../services/user";

const url = "http://localhost:5000";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enabledTermsCheckBox, setEnabledTermsCheckBox] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  const [message, setMessage] = useState("");

  const history = useHistory();

  const emailRegex = RegExp(
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
  );

  const handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(firstName);
        value.length < 3
          ? setFirstNameError("First name must be at least 3 characters.")
          : setFirstNameError("");
        break;
      case "lastName":
        setLastName(lastName);
        value.length < 3
          ? setLastNameError("Last name must be at least 3 characters.")
          : setLastNameError("");
        break;
      case "username":
        setUsername(username);
        value.length < 8
          ? setUsernameError("Username must be at least 8 characters.")
          : setUsernameError("");
        break;
      case "email":
        setEmail(email);
        emailRegex.test(value)
          ? setEmailError("")
          : setEmailError("Email address is invalid.");
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
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
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

    setFirstName(firstName);
    setLastName(lastName);
    setUsername(username);
    setEmail(email);
    setPassword(password);
    setConfirmPassword(confirmPassword);
    setEnabledTermsCheckBox(enabledTermsCheckBox);
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setUsernameError(usernameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);
    setTermsError(termsError);

    if (
      firstName &&
      lastName &&
      username &&
      email &&
      password &&
      confirmPassword &&
      enabledTermsCheckBox &&
      !firstNameError &&
      !lastNameError &&
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      console.log(
        `--SUBMITTING-- 
      Email: ${email} 
      Password: ${password}`
      );

      POSTRequest(
        url +
          "/api/v1/signup/?username=" +
          username +
          "&email_id=" +
          email +
          "&password=" +
          password +
          "&first_name=" +
          firstName +
          "&last_name=" +
          lastName
      ).then((data) => {
        if (data.error) {
          if (data.status === 444) {
            setMessage("Username already exists. Please try again.");
          } else if (data.status === 445)
            setMessage("Email address already exists. Please try again.");
        } else {
          setMessage("New user created.");
          history.push("/signupsuccess");
        }
      });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (!firstName) {
        setFirstNameError("First name is required.");
      }
      if (!lastName) {
        setLastNameError("Last name is required.");
      }
      if (!username) {
        setUsernameError("Username is required.");
      }
      if (!email) {
        setEmailError("Email address is required.");
      }
      if (!password) {
        setPasswordError("Password is required.");
      }
      if (!confirmPassword) {
        setConfirmPasswordError("Please confirm password.");
      }
      if (!enabledTermsCheckBox) {
        setTermsError("Please agree to the Terms and Conditions.");
      }
    }
  };

  const handleTermsClick = (e) => {
    e.persist();
    setEnabledTermsCheckBox(!enabledTermsCheckBox);

    if (!enabledTermsCheckBox) {
      setTermsError("");
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
        Welcome, please sign up your account.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={firstName}
            className={firstNameError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "firstName")}
            onBlur={(e) => handleBlur(e, "firstName")}
            fullWidth
          />
          {firstNameError.length > 0 && (
            <Box className="errorMessage">{firstNameError}</Box>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={lastName}
            className={lastNameError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "lastName")}
            onBlur={(e) => handleBlur(e, "lastName")}
            fullWidth
          />
          {lastNameError.length > 0 && (
            <Box className="errorMessage">{lastNameError}</Box>
          )}
        </Grid>
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
            name="email"
            label="Email"
            value={email}
            className={emailError.length > 0 ? "error" : null}
            onChange={(e) => handleChange(e, "email")}
            onBlur={(e) => handleBlur(e, "email")}
            fullWidth
          />
          {emailError.length > 0 && (
            <Box className="errorMessage">{emailError}</Box>
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
        <Box display="flex" flexDirection="column">
          <FormControlLabel
            control={<Checkbox name="terms" color="primary" />}
            label="I agree with the Terms and Conditions"
            checked={enabledTermsCheckBox}
            onClick={handleTermsClick}
          />
          {termsError.length > 0 && (
            <Box className="errorMessage">{termsError}</Box>
          )}
        </Box>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          className="btn"
          onClick={handleSubmit}
        >
          Signup
        </Button>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Typography
          style={{
            position: "relative",
            bottom: "-18px",
          }}
        >
          Already a member? <Link href="./login">Log In</Link>
        </Typography>
      </Box>
    </form>
  );
};

export const Signup = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <SignupForm />
      </Box>
    </MainWrapper>
  );
};
