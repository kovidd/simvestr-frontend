import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Signup } from "./user/Signup";
import { Login } from "./user/Login";
import { TermsAndConditions } from "./user/TermsAndConditions";
import { SignupSuccess } from "./user/SignupSuccess";
import { ForgotPassword } from "./user/ForgotPassword";
import { ResetPassword } from "./user/ResetPassword";
import { Homepage } from "./home/Homepage";
import { StockList } from "./stocks/StockList";
import { ApiTokenContext } from "../services/api";
const Main = () => {
  const [apiToken, setApiToken] = useState("");
  const value = { apiToken, setApiToken };
  return (
    <ApiTokenContext.Provider value={value}>
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
          <Route path="/stocks">
            <StockList />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="*">
            <Redirect to={{ pathname: "/login" }} />
          </Route>
        </Switch>
      </Router>
    </ApiTokenContext.Provider>
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
