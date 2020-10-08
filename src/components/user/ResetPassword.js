import React from "react";
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

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      confirmPassword: null,
      formErrors: {
        password: "",
        confirmPassword: "",
      },
    };
  }

  handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "password":
        formErrors.password =
          value.length < 8 ? "Password must be at least 8 characters." : "";
        formErrors.confirmPassword =
          value != this.state.password ? "Passwords don't match." : "";
        break;
      case "confirmPassword":
        if (
          formErrors.password.value !== "undefined" &&
          formErrors.confirmPassword.value !== "undefined"
        ) {
          formErrors.confirmPassword =
            value != this.state.password ? "Passwords don't match." : "";
        }
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Password: ${this.state.password}`);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (this.state.password === null) {
        formErrors.password = "Password is required.";
      }
      if (this.state.confirmPassword === null) {
        formErrors.confirmPassword = "Please confirm password.";
      }
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

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
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  noValidate
                  className={formErrors.password.length > 0 ? "error" : null}
                  onBlur={this.handleBlur}
                  fullWidth
                />
                {formErrors.password.length > 0 && (
                  <Box className="errorMessage">{formErrors.password}</Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  noValidate
                  className={
                    formErrors.confirmPassword.length > 0 ? "error" : null
                  }
                  onBlur={this.handleBlur}
                  fullWidth
                />
                {formErrors.confirmPassword.length > 0 && (
                  <Box className="errorMessage">
                    {formErrors.confirmPassword}
                  </Box>
                )}
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="center">
              <Button
                className="btn"
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Reset Password
              </Button>
            </Box>
          </form>
        </Box>
      </MainWrapper>
    );
  }
}

export default Login;
