import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../services/api";

export const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return <Route component={Component} {...rest} />;
};

export const UnauthenticatedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <Route component={Component} {...rest} />;
};
