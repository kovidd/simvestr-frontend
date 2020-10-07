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
