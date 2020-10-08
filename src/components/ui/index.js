import React from "react";
import styled from "styled-components";
import { Box, Paper, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Terminal = styled.div`
  border: 14px solid rgba(0, 127, 127, 1);
  &:hover {
    border-color: rgba(0, 127, 127, 0.8);
  }
`;

const StyledPaper = styled(Paper)`
  width: 40vw;
  padding: 1rem;
  min-height: 40vh;
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
        <StyledPaper square elevation={10}>
          {!["/", "/signup", "/login", "/signupsuccess"].includes(
            location.pathname
          ) && <BreadCrumbsNav location={location} />}
          {children}
        </StyledPaper>
      </Terminal>
    </Box>
  );
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const breadcrumbNameMap = {
  "/stocks": "stocks",
  "/": "home",
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

        return last ? (
          <Typography color="textPrimary" key={to}>
            {breadcrumbNameMap[to]}
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
