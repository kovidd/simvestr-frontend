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
  Link,
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
        <Typography variant="h2">Simvstr</Typography>
        <Typography varaint="body2">
          Welcome Back, please login to your account.
        </Typography>
        <form>
          <Grid container spacing={2}>
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
              <Box display="flex" justifyContent="flex-end">
                <Link href="#">Forgot Password?</Link>
              </Box>
            </Grid>
            <Box display="flex" flexDirection="column">
              <FormControlLabel
                control={<Checkbox name="rememberme" color="primary" />}
                label="Remember me"
              />
            </Box>
          </Grid>

          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("login")}
            >
              Login
            </Button>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="flex-start">
            <Typography>
              Not a member? <Link href="./signup">Sign Up</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};

export const Login = () => {
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
