import React, { useContext } from "react";
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
import { resetPassword } from "../../services/user";
import { NotificationContext } from "../ui/Notification";

const ResetPasswordForm = () => {
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onBlur",
  });
  const { setNotification } = useContext(NotificationContext);

  const onSubmit = async (data) => {
    // submit the reset password form
    const body = {
      email: data.email,
      password: data.password,
      OTP: data.otp,
    };
    const res = await resetPassword(body);
    if (!res.error) {
      setNotification({
        open: true,
        message: `Password reset successful.`,
      });
    } else {
      setNotification({
        open: true,
        message: res.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>
        <Link href="./">Back to Login Page</Link>
      </Typography>
      <Typography variant="h2" align="center">
        Simvestr
      </Typography>
      <Typography varaint="body2" align="center">
        Here you can reset your password.
      </Typography>
      <Typography varaint="body2" align="center">
        Enter OTP and new password to reset.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <TextField
            inputRef={register({
              required: "OTP is required.",
              minLength: {
                value: 4,
                message: "OTP must be a 4 digits number.",
              },
              maxLength: {
                value: 4,
                message: "OTP must be a 4 digits number.",
              },
              pattern: {
                value: /\d{4}/,
                message: "OTP must be a 4 digits number.",
              },
            })}
            name="otp"
            label="OTP"
            className={errors?.otp ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="otp" />
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
      </Grid>
      <Box display="flex" justifyContent="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ bottom: "-15px" }}
        >
          Reset Password
        </Button>
      </Box>
    </form>
  );
};

export const ResetPassword = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <ResetPasswordForm />
      </Box>
    </MainWrapper>
  );
};
