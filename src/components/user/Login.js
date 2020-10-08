import React from "react";
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

const LoginForm = () => {
  return (
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
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <FormControlLabel
              control={<Checkbox name="rememberme" color="primary" />}
              label="Remember me"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert("login")}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row" justifyContent="flex-start">
        <Typography>
          Not a member? <Link href="./signup">Sign Up</Link>
        </Typography>
      </Box>
    </form>
  );
};

export const Login = () => {
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
        <LoginForm />
      </Box>
    </MainWrapper>
  );
};
