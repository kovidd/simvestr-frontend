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
import { ForgotPassword } from "./user/ForgotPassword";
import { ResetPassword } from "./user/ResetPassword";
import { Homepage } from "./home/Homepage";
import { StockList } from "./stocks/StockList";
import { WatchList } from "./watchlist/WatchList";
import { AuthContext } from "../services/api";
import { UserContext } from "../services/user";
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
  console.log(auth);
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
            <AuthenticatedRoute path="/watchlist" component={WatchList} />
            <AuthenticatedRoute exact path="/" component={Homepage} />
            <Redirect to={{ pathname: fallbackUri }} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </AuthContext.Provider>
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
