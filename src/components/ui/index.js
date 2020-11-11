import React from "react";
import styled from "styled-components";
import { Box, Paper, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const Terminal = styled.div`
  border: 14px solid rgba(0, 127, 127, 1);
  &:hover {
    border-color: rgba(0, 127, 127, 0.8);
  }
`;

const StyledPaper = styled(Paper)`
  min-width: 40vw;
  padding: 1rem;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MainWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <Box
      height="100vh"
      display="flex"
      flex="1"
      alignItems="center"
      justifyContent="center"
    >
      <Terminal>
        <StyledPaper
          square
          elevation={10}
          style={{ maxHeight: "95vh", overflow: "auto" }}
        >
          {![
            "/",
            "/signup",
            "/login",
            "/signupsuccess",
            "/forgotpassword",
            "/resetpassword",
            "/terms-and-conditions-signup",
          ].includes(location.pathname) && (
            <BreadCrumbsNav location={location} />
          )}
          {children}
        </StyledPaper>
      </Terminal>
    </Box>
  );
};

export const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const breadcrumbNameMap = {
  "/stocks": "stocks",
  "/": "home",
  "/watchlist": "watchlist",
  "/leaderboard": "leader board",
  "/settings": "settings",
  "/settings/personaldetails": "personal details",
  "/settings/password": "password",
  "/settings/terms-and-conditions-settings": "terms and conditions",
  "/settings/faq": "FAQ",
};

export const BreadCrumbsNav = ({ location }) => {
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter color="inherit" to="/">
        home
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last && !to.includes("/watchlist/") ? (
          <Typography color="textPrimary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : last && to.includes("/watchlist/") ? (
          <Typography color="textPrimary" key={to}>
            {/[^/]*$/.exec(to)[0]}
          </Typography>
        ) : (
          <LinkRouter color="inherit" to={to} key={to}>
            {breadcrumbNameMap[to]}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export const ErrorWrapper = styled.div`
  color: rgba(0, 127, 127, 0.8);
  font-size: 0.8rem;
  position: relative;
`;

export const FormErrorMessage = ({ errors, name }) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <ErrorWrapper>{message}</ErrorWrapper>}
  />
);
