import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { Container, NoSsr } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// Components
import { Signup } from "./user/Signup";
import { Login } from "./user/Login";
import { TermsAndConditionsSignup } from "./user/TermsAndConditionsSignup";
import { TermsAndConditionsSettings } from "./settings/TermsAndConditionsSettings";
import { FAQ } from "./settings/FAQ";
import { ForgotPassword } from "./user/ForgotPassword";
import { ResetPassword } from "./user/ResetPassword";
import { Homepage } from "./home/Homepage";
import { StockOverview } from "./stocks/StockOverview";
import { Dashboard } from "./dashboard/Dashboard";
import { HistoricalTrades } from "./trades/HistoricalTrades";
import { LeaderBoard } from "./leaderboard/LeaderBoard";
import { WatchListSummary } from "./watchlist/WatchListSummary";
import { WatchListDetails } from "./watchlist/WatchListDetails";
import { AccountSettings } from "./settings/AccountSettings";
import { PersonalDetails } from "./settings/PersonalDetails";
import { Password } from "./settings/Password";

// Contexts
import { AuthContext } from "../services/api";
import { UserContext, userDetails } from "../services/user";
import { PortfolioContext } from "../services/portfolio";
import { WatchlistContext } from "../services/watchlist";
import { Notification, NotificationContext } from "./ui/Notification";

// Routes
import { UnauthenticatedRoute, AuthenticatedRoute } from "./Routes";

import { refreshToken } from "../services/user";

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
    portfolio: [],
  });

  const [watchlist, setWatchlist] = useState([]);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const [isLoadingToken, setIsLoadingToken] = useState(true);

  useEffect(() => {
    async function getNewToken() {
      const res = await refreshToken();

      if (!res.error) {
        setAuth({
          isAuthenticated: true,
        });
      }
      setIsLoadingToken(false);
    }
    getNewToken();
  }, []);

  useEffect(() => {
    async function getUserDetails() {
      const res = await userDetails();
      if (!res.error) {
        setUser({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email_id,
        });
      } else {
        setNotification({
          open: true,
          message: `Error getting user details.`,
        });
      }
    }
    auth.isAuthenticated && getUserDetails();
  }, [setUser, setNotification, auth.isAuthenticated]);

  const fallbackUri = auth.isAuthenticated ? "/" : "/login";
  return (
    !isLoadingToken && (
      <AuthContext.Provider value={{ auth, setAuth }}>
        <UserContext.Provider value={{ user, setUser }}>
          <PortfolioContext.Provider value={{ portfolio, setPortfolio }}>
            <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
              <NotificationContext.Provider
                value={{ notification, setNotification }}
              >
                <Notification
                  open={notification.open}
                  message={notification.message}
                  handleClose={() =>
                    setNotification({ open: false, message: "" })
                  }
                />
                <Router>
                  <Switch>
                    <Route
                      path="/terms-and-conditions"
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
                    <AuthenticatedRoute
                      exact
                      path="/stocks/:symbol"
                      component={StockOverview}
                    />
                    <AuthenticatedRoute
                      path="/stocks"
                      component={StockOverview}
                    />
                    <AuthenticatedRoute
                      path="/dashboard"
                      component={Dashboard}
                    />
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
                    <AuthenticatedRoute
                      path="/trades"
                      component={HistoricalTrades}
                    />
                    <AuthenticatedRoute
                      path="/leaderboard"
                      component={LeaderBoard}
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
                    <AuthenticatedRoute
                      exact
                      path="/settings/terms-and-conditions-settings"
                      component={TermsAndConditionsSettings}
                    />
                    <AuthenticatedRoute
                      exact
                      path="/settings/faq"
                      component={FAQ}
                    />
                    <Redirect to={{ pathname: fallbackUri }} />
                  </Switch>
                </Router>
              </NotificationContext.Provider>
            </WatchlistContext.Provider>
          </PortfolioContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    )
  );
};

function App() {
  return (
    <NoSsr>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Container maxWidth="md">
            <Main />
          </Container>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}

export default App;
