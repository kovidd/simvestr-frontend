import React, { useState } from "react";
import "../../index.css";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { MainWrapper, FormErrorMessage } from "../ui";
import { forgotPassword } from "../../services/user";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    // submit the forgot password request
    const body = {
      email: data.email,
    };
    const res = await forgotPassword(body);
    if (!res.error) {
      setMessage("An email has been sent to you.");
      var win = window.open("/resetpassword", "_blank");
      win.focus();
    } else {
      setMessage(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>
        <Link href="./">Back to Login Page</Link>
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        color="#007f7f"
        fontSize="h5.fontSize"
      >
        {message}
      </Box>
      <Typography variant="h2" align="center">
        Simvestr
      </Typography>
      <Typography varaint="body2" align="center">
        Enter your email address and we will send through an email with a
        one-time password (OTP).
      </Typography>
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
      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ bottom: "-15px" }}
        >
          Send Request
        </Button>
      </Box>
    </form>
  );
};

export const ForgotPassword = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <ForgotPasswordForm />
      </Box>
    </MainWrapper>
  );
};
