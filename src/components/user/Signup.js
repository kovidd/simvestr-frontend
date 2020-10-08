import React from "react";
import "../../index.css";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import { MainWrapper } from "../ui";

const emailRegex = RegExp(
  /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
);

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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      terms: null,
      enabledTermsCheckBox: false,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: "",
      },
    };
  }

  handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "First name must be at least 3 charachters." : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "Last name must be at least 3 charachters." : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Email address is invalid.";
        break;
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

    if (formValid(this.state) && this.state.enabledTermsCheckBox) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        Confirm Password: ${this.state.confirmPassword}
      `);
      this.props.history.push("/signupsuccess");
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (this.state.firstName === null) {
        formErrors.firstName = "First name is required.";
      }
      if (this.state.lastName === null) {
        formErrors.lastName = "Last name is required.";
      }
      if (this.state.email === null) {
        formErrors.email = "Email address is required.";
      }
      if (this.state.password === null) {
        formErrors.password = "Password is required.";
      }
      if (this.state.confirmPassword === null) {
        formErrors.confirmPassword = "Please confirm password.";
      }
      if (!this.state.enabledTermsCheckBox)
        formErrors.terms = "Please agree to the Terms and Conditions.";
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleTermsClick = (e) => {
    let { enabledTermsCheckBox } = this.state;
    let formErrors = { ...this.state.formErrors };
    const { name, value } = e.target;

    this.setState({
      enabledTermsCheckBox: !enabledTermsCheckBox,
    });

    if (!this.state.enabledTermsCheckBox) formErrors.terms = "";
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
            Welcome back, please login to your account.
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="First Name"
                  noValidate
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  onBlur={this.handleBlur}
                  fullWidth
                />
                {formErrors.firstName.length > 0 && (
                  <Box className="errorMessage">{formErrors.firstName}</Box>
                )}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  noValidate
                  className={formErrors.lastName.length > 0 ? "error" : null}
                  onBlur={this.handleBlur}
                  fullWidth
                />
                {formErrors.lastName.length > 0 && (
                  <Box className="errorMessage">{formErrors.lastName}</Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  noValidate
                  className={formErrors.email.length > 0 ? "error" : null}
                  onBlur={this.handleBlur}
                  fullWidth
                />
                {formErrors.email.length > 0 && (
                  <Box className="errorMessage">{formErrors.email}</Box>
                )}
              </Grid>
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
              <Box display="flex" flexDirection="column">
                <FormControlLabel
                  control={<Checkbox name="terms" color="primary" />}
                  label="I agree with the Terms and Conditions"
                  onChange={this.handleTermsClick}
                />
              </Box>
              {<Box className="errorMessage">{formErrors.terms}</Box>}
            </Grid>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Sign Up
              </Button>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="flex-start">
              <Typography>
                Already a member? <Link href="./login">Log In</Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </MainWrapper>
    );
  }
}

export default withRouter(Signup);
