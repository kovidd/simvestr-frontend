import React, { useContext } from "react";
import "../../index.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { MainWrapper, FormErrorMessage } from "../ui";
import { changeName, UserContext, userDetails } from "../../services/user";
import { NotificationContext } from "../ui/Notification";

const PersonalDetailsForm = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { setNotification } = useContext(NotificationContext);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const onSubmit = async (data) => {
    // submit the change personal details
    const body = {
      email_id: user.email,
      first_name: data.firstName,
      last_name: data.lastName,
    };
    const res = await changeName(body);
    if (!res.error) {
      setNotification({
        open: true,
        message: `Personal details updated.`,
      });
      const res = await userDetails();
      if (!res.error) {
        setUser({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email_id,
        });
      }
    } else {
      setNotification({
        open: true,
        message: `Failed to update personal details.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography varaint="body2" align="center">
        Update your personal details here.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "First name is required.",
              minLength: {
                value: 3,
                message: "First name must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "First name must not exceed 20 characters.",
              },
            })}
            name="firstName"
            label="First Name"
            className={errors?.firstName ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="firstName" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputRef={register({
              required: "Last name is required.",
              minLength: {
                value: 3,
                message: "Last name must be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "Last name must not exceed 20 characters.",
              },
            })}
            name="lastName"
            label="Last Name"
            className={errors?.lastName ? "error" : null}
            fullWidth
          />
          <FormErrorMessage errors={errors} name="lastName" />
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

export const PersonalDetails = () => {
  return (
    <MainWrapper>
      <Box
        display="flex"
        height="100%"
        flexDirection="column"
        alignItems="center"
        p="2rem"
      >
        <PersonalDetailsForm />
      </Box>
    </MainWrapper>
  );
};
