import React, { useState } from "react";
import "../../index.css";
import { useForm } from "react-hook-form";
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
import { login } from "../../services/user";

const LoginForm = () => {
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
      rememberMe: localStorage.getItem("rememberMe") === "true",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    // submit the login
    const body = {
      email_id: data.email,
      password: data.password,
    };
    const res = await login(body);
    if (!res.error) {
      localStorage.setItem("rememberMe", getValues("rememberMe"));
      localStorage.setItem("email", getValues("rememberMe") ? data.email : "");
      localStorage.setItem(
        "password",
        getValues("rememberMe") ? data.password : ""
      );
      setMessage("Login Successful.");
    } else {
      setMessage(res.message);
    }
  };

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
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row" justifyContent="flex-start">
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    color="primary"
                    defaultChecked={
                      localStorage.getItem("rememberMe") === "true"
                    }
                  />
                }
                inputRef={register}
                label="Remember me"
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="flex-start">
            <Typography>
              Not a member? <Link href="./signup">Sign Up</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
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
        <LoginForm />
      </Box>
    </MainWrapper>
  );
};
