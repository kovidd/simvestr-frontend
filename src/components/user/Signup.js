import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { MainWrapper, FormErrorMessage, LinkRouter } from "../ui";
import { signup } from "../../services/user";
import { AuthContext } from "../../services/api";
import { NotificationContext } from "../ui/Notification";
import logo from "../../assets/logo.png";

const SignupForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onBlur",
  });
  const { setNotification } = useContext(NotificationContext);

  const onSubmit = async (data) => {
    // submit the signup
    const body = {
      email: data.email.toLowerCase(),
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    };
    const res = await signup(body);
    if (!res.error) {
      setNotification({
        open: true,
        message: `Singup Successful.`,
      });
      history.push("/login");
    } else {
      setNotification({
        open: true,
        message: res.message,
      });
    }
  };

  const termsLabel = (
    <span>
      I agree with the{" "}
      <LinkRouter
        to="./terms-and-conditions"
        target="_blank"
        rel="noreferrer noopener"
      >
        Terms and Conditions
      </LinkRouter>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb="1rem" width="100%" display="inline-flex" alignItems="center">
        <Box mr="1rem">
          <img src={logo} alt="Simvestr Logo" height="60" width="60" />
        </Box>
        <Typography variant="h4">Simvestr v1.0</Typography>
      </Box>
      <Typography varaint="body2">
        Welcome, please sign up to create your account.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            inputRef={register({
              required: "First name is required.",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "First name must not exceed 20 characters.",
              },
            })}
            name="firstName"
            label="First Name"
            className={errors?.firstName ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="firstName" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            inputRef={register({
              required: "Last name is required.",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "Last name must not exceed 20 characters.",
              },
            })}
            name="lastName"
            label="Last Name"
            className={errors?.lastName ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="lastName" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "Email address is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email address is invalid.",
              },
            })}
            name="email"
            label="Email"
            className={errors?.email ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
            name="password"
            type="password"
            label="Password"
            className={errors?.password ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="password" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "Please confirm password.",
              validate: (value) =>
                getValues("password") === value || "Passwords don't match.",
            })}
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={errors?.confirmPassword ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="confirmPassword" />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-start">
            <Box>
              <FormControlLabel
                inputRef={register({
                  required:
                    "You must agree with the Terms and Conditions to sign up.",
                })}
                control={<Checkbox name="terms" color="primary" />}
                label={termsLabel}
              />
              <FormErrorMessage errors={errors} name="terms" />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography>
          Already a member? <Link href="./login">Log In</Link>
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary">
            Signup
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export const Signup = () => {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  if (auth.isAuthenticated) {
    history.replace("/");
  }
  return (
    <Container maxWidth="sm">
      <MainWrapper>
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          alignItems="center"
        >
          <SignupForm />
        </Box>
      </MainWrapper>
    </Container>
  );
};
