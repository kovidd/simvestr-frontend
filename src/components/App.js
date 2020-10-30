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
import { WatchList } from "./watchlist/WatchList";
import { AuthContext } from "../services/api";
import { UserContext } from "../services/user";
import { PortfolioContext } from "../services/portfolio";
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
    firstName: "",
    lastName: "",
    email: "",
  });
  const [portfolio, setPortfolio] = useState({
    name: "",
    balance: 0,
    totalValue: 0,
    portfolio: {},
  });

  const fallbackUri = auth.isAuthenticated ? "/" : "/login";
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
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
              <AuthenticatedRoute path="/watchlist" component={WatchList} />
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
        </PortfolioContext.Provider>
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
