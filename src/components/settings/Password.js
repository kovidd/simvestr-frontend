import React, { useState, useContext } from "react";
import "../../index.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { MainWrapper, FormErrorMessage } from "../ui";
import { changePassword, UserContext } from "../../services/user";

const PasswordForm = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const { register, handleSubmit, errors, getValues } = useForm({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmpassword: "",
    },
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    // submit the change password
    const body = {
      email_id: user.email,
      password: data.password,
    };
    const res = await changePassword(body);
    if (!res.error) {
      setMessage("Password changed.");
    } else {
      setMessage("Failed to change password.");
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
      <Typography varaint="body2" align="center">
        Change your password here.
      </Typography>
      <Grid container spacing={2}>
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
            label="New Password"
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
            label="Confirm New Password"
            className={errors?.confirmPassword ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="confirmPassword" />
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/settings")}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export const Password = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <PasswordForm />
      </Box>
    </MainWrapper>
  );
};
