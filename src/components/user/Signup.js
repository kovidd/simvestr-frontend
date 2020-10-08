import React from "react";
import {
  Grid,
  Box,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Container,
  Link,
} from "@material-ui/core";
import { MainWrapper } from "../ui";

const SignupForm = () => {
  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField name="firstName" label="First Name" fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField name="lastName" label="Last Name" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="email" type="email" label="Email" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <FormControlLabel
              control={<Checkbox name="terms" color="primary" />}
              label="I agree with the Terms and Conditions"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("signup")}
            >
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Typography>
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
        <Typography variant="h2">Simvstr</Typography>
        <Typography variant="body2">
          Welcome, please create your account.
        </Typography>
        <SignupForm />
      </Box>
    </MainWrapper>
  );
};
