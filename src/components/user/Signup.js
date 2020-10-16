import React, { useState } from "react";
import "../../index.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as EmailValidator from "email-validator";
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
import { MainWrapper, FormErrorMessage } from "../ui";
import { signup } from "../../services/user";

const SignupForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors, getValues } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    // submit the signup
    const body = {
      email_id: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      username: "testuser123",
    };
    const res = await signup(body);
    if (!res.error) {
      setMessage("New user created.");
      history.push("/signupsuccess");
    } else {
      setMessage(res.message);
    }
  };

  const termsLabel = (
    <span>
      By signing up you agree to our&nbsp; 
      <a href="./termsandconditions">
        terms and conditions
      </a>
    </span>

  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            inputRef={register({ required: "First name required." })}
            name="firstName"
            label="First Name"
            className={errors?.firstName ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="firstName" />
        </Grid>
        <Grid item xs={6}>
          <TextField
            inputRef={register({ required: "Last name required." })}
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
              required: "Email required.",
              validate: (value) =>
                EmailValidator.validate(value) || "Email address is invalid.",
            })}
            name="email"
            label="Email"
            type="email"
            className={errors?.email ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="email" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "Password required.",
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
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box>
              <FormControlLabel
                inputRef={register({
                  required:
                    "You must agree with the Terms and Conditions to sign up.",
                })}
                control={<Checkbox name="terms" color="primary" />}
                label="I agree with the Terms and Conditions"
              />
              <FormErrorMessage errors={errors} name="terms" />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </Box>
        </Grid>
      </Grid>

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
