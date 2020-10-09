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

class SignupSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      enabledRememberMeCheckBox: false,
      formErrors: {
        email: "",
        password: "",
      },
    };
  }

  handleBlur = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Email address is invalid.";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "Password must be at least 8 characters." : "";
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
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      localStorage.setItem("rememberMe", this.state.enabledRememberMeCheckBox);
      localStorage.setItem(
        "email",
        this.state.enabledRememberMeCheckBox ? this.state.email : ""
      );
      localStorage.setItem(
        "password",
        this.state.enabledRememberMeCheckBox ? this.state.password : ""
      );
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
      if (this.state.email === null) {
        formErrors.email = "Email address is required.";
      }
      if (this.state.password === null) {
        formErrors.password = "Password is required.";
      }
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  handleRememberMeClick = () => {
    let { enabledRememberMeCheckBox } = this.state;

    this.setState({
      enabledRememberMeCheckBox: !enabledRememberMeCheckBox,
    });
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
          <Typography color="primary" variant="h5">
            Signup successful! Please login.
          </Typography>
          <Typography variant="h2">Simvstr</Typography>
          <Typography varaint="body2">
            Welcome, please login to your account.
          </Typography>
          <form>
            <Grid container spacing={2}>
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
                <Box display="flex" justifyContent="flex-end">
                  <Link href="./forgotpassword">Forgot Password?</Link>
                </Box>
              </Grid>
              <Box display="flex" flexDirection="column">
                <FormControlLabel
                  control={<Checkbox name="rememberMe" color="primary" />}
                  label="Remember me"
                  onChange={this.handleRememberMeClick}
                />
              </Box>
            </Grid>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
              >
                Login
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
            ></Box>
          </form>
        </Box>
      </MainWrapper>
    );
  }
}

export default SignupSuccess;
