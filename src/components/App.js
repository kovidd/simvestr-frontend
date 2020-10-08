import React from "react";
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
import { Homepage } from "./home/Homepage";
import { StockList } from "./stocks/StockList";

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
        <Route path="/stocks">
          <StockList />
        </Route>
        <Route exact path="/">
          <Homepage />
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
