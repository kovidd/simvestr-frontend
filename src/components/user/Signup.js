import React from "react";
import styled from "styled-components";
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
} from "@material-ui/core";

const SignupForm = () => {
  return (
    <Paper elevation={10}>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <Typography variant="h2">Sign Up</Typography>
        <Typography varaint="body2">
          Welcome, please create your account:
        </Typography>
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
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    onChange={() => alert("clicked")}
                    name="terms"
                    color="primary"
                  />
                }
                label="I agree with the Terms and Conditions"
              />
            </Box>
          </Grid>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("signup")}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export const Signup = () => {
  return (
    <Container maxWidth="lg">
      <Box
        height="100vh"
        display="flex"
        flex="1"
        flexDirection="row-reverse"
        bgcolor="blac"
      >
        <Box
          display="flex"
          flex="1"
          mx="7rem"
          justifyContent="center"
          flexDirection="column"
        >
          <SignupForm />
        </Box>
        <Box flex="1"></Box>
      </Box>
    </Container>
  );
};
