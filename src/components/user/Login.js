import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";

import { FormErrorMessage, LinkRouter } from "../ui";
import { login } from "../../services/user";
import { AuthContext } from "../../services/api";
import { NotificationContext } from "../ui/Notification";
import logo from "../../assets/logo.png";

const LoginForm = () => {
  const history = useHistory();
  const { setNotification } = useContext(NotificationContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setAuth } = useContext(AuthContext);

  const onSubmit = async (data) => {
    const body = {
      email: data.email.toLowerCase(),
      password: data.password,
    };
    const res = await login(body);
    if (!res.error) {
      setAuth({
        isAuthenticated: true,
      });
      history.push("/");
    } else {
      setNotification({
        open: true,
        message: `Invalid login, please retry.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box mb="1rem" width="100%" display="inline-flex" alignItems="center">
        <Box mr="1rem">
          <img src={logo} alt="Simvestr Logo" height="60" width="60" />
        </Box>
        <Typography variant="h4">Simvestr v1.0</Typography>
      </Box>
      <Typography varaint="body2">
        Welcome back, please login to your account.
      </Typography>
      <Grid container spacing={2}>
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
          <Box display="flex" justifyContent="flex-end">
            <LinkRouter to="forgotpassword">Forgot Password?</LinkRouter>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" justifyContent="flex-start">
              <Typography>
                Not a member? <LinkRouter to="signup">Sign Up</LinkRouter>
              </Typography>
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export const Login = () => {
  return (
    <Box
      display="flex"
      height="100%"
      flexDirection="column"
      alignItems="center"
    >
      <LoginForm />
    </Box>
  );
};
