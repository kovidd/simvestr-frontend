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
import { TermsAndConditionsSignup } from "./user/TermsAndConditionsSignup";
import { TermsAndConditionsSettings } from "./settings/TermsAndConditionsSettings";
import { FAQ } from "./settings/FAQ";
import { ForgotPassword } from "./user/ForgotPassword";
import { ResetPassword } from "./user/ResetPassword";
import { Homepage } from "./home/Homepage";
import { StockList } from "./stocks/StockList";
import { LeaderBoard } from "./leaderboard/LeaderBoard";
import { WatchListSummary } from "./watchlist/WatchListSummary";
import { WatchListDetails } from "./watchlist/WatchListDetails";
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
                path="/terms-and-conditions-signup"
                component={TermsAndConditionsSignup}
              />
              <UnauthenticatedRoute path="/signup" component={Signup} />
              <UnauthenticatedRoute path="/login" component={Login} />
              <UnauthenticatedRoute
                path="/forgotpassword"
                component={ForgotPassword}
              />
              <UnauthenticatedRoute
                path="/resetpassword"
                component={ResetPassword}
              />
              <AuthenticatedRoute path="/stocks" component={StockList} />
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
              <AuthenticatedRoute path="/leaderboard" component={LeaderBoard} />
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
              <AuthenticatedRoute
                exact
                path="/settings/terms-and-conditions-settings"
                component={TermsAndConditionsSettings}
              />
              <AuthenticatedRoute exact path="/settings/faq" component={FAQ} />
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
