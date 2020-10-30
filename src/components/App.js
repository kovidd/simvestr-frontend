import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { NoSsr } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
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
import { ForgotPassword } from "./user/ForgotPassword";
import { ResetPassword } from "./user/ResetPassword";
import { Homepage } from "./home/Homepage";
import { StockList } from "./stocks/StockList";
import { WatchListSummary } from "./watchlist/WatchListSummary";
import { WatchListDetails } from "./watchlist/WatchListDetails";
import { AuthContext } from "../services/api";
import { UserContext } from "../services/user";
import { AccountSettings } from "./settings/AccountSettings";
import { PersonalDetails } from "./settings/PersonalDetails";
import { Password } from "./settings/Password";
import { UnauthenticatedRoute, AuthenticatedRoute } from "./Routes";

const Main = () => {
  const [auth, setAuth] = useState({
    apiToken: "",
    isAuthenticated: false,
  });
  const [user, setUser] = useState({
    firstName: "admin",
  });
  const fallbackUri = auth.isAuthenticated ? "/" : "/login";
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Switch>
            <Route
              path="/terms-and-conditions"
              component={TermsAndConditions}
            />
            <UnauthenticatedRoute path="/signup" component={Signup} />
            <UnauthenticatedRoute path="/login" component={Login} />
            <UnauthenticatedRoute
              path="/forgotpassword"
              component={ForgotPassword}
            />
            <AuthenticatedRoute
              path="/resetpassword"
              component={ResetPassword}
            />
            <AuthenticatedRoute path="/stocks" component={StockList} />
            <AuthenticatedRoute
              exact
              path="/watchlist"
              component={WatchListSummary}
            />
            <AuthenticatedRoute
              exact
              path="/watchlist/:symbol"
              component={WatchListDetails}
            />

            <AuthenticatedRoute exact path="/" component={Homepage} />
            <AuthenticatedRoute
              exact
              path="/settings"
              component={AccountSettings}
            />
            <AuthenticatedRoute
              exact
              path="/settings/personaldetails"
              component={PersonalDetails}
            />
            <AuthenticatedRoute
              exact
              path="/settings/password"
              component={Password}
            />
            <Redirect to={{ pathname: fallbackUri }} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}

export default App;
