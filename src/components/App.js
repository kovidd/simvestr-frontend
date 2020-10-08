import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Signup from "./user/Signup";
import Login from "./user/Login";
import SignupSuccess from "./user/SignupSuccess";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signupsuccess">
          <SignupSuccess />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword">
          <ResetPassword />
        </Route>
        <Route path="*">
          <Redirect to={{ pathname: "/login" }} />
        </Route>
      </Switch>
    </Router>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
