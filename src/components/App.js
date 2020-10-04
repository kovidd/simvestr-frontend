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

const Main = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <div>login page</div>
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
