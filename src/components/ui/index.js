import React from "react";
import styled from "styled-components";
import {
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Typography,
  TableCell,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const Terminal = styled.div`
  border: 14px solid rgba(0, 127, 127, 1);
  &:hover {
    border-color: rgba(0, 127, 127, 0.8);
  }
  width: 100%;
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: calc(100vh - 3.6rem);
  overflow-y: auto;
`;

export const MainWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <Box
      display="flex"
      flex="1"
      mt="1rem"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Terminal>
        <StyledPaper square elevation={10}>
          {![
            "/",
            "/signup",
            "/login",
            "/signupsuccess",
            "/forgotpassword",
            "/resetpassword",
            "/terms-and-conditions",
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
  "/dashboard": "dashboard",
  "/leaderboard": "leaderboard",
  "/trades": "historical trades",
  "/settings": "settings",
  "/settings/personaldetails": "personal details",
  "/settings/password": "password",
  "/settings/terms-and-conditions-settings": "terms and conditions",
  "/settings/faq": "FAQ",
  "/settings/export": "Export",
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

        return last &&
          !(to.includes("/watchlist/") || to.includes("/stocks/")) ? (
          <Typography color="textPrimary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : last && (to.includes("/watchlist/") || to.includes("/stocks/")) ? (
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

export const PriceTypography = styled(Typography)`
  && {
    color: ${(props) => (props.change >= 0 ? "green" : "red")};
  }
`;

export const PriceTableCell = styled(TableCell)`
  && {
    color: ${(props) => (props.change >= 0 ? "green" : "red")};
  }
`;

export const StyledListItemText = styled(ListItemText)`
  & > :before {
    display: inline-block;
    content: "";
    border-top: 1px solid black;
    width: 0.7rem;
    transform: translateY(-4px);
    margin-right: 3px;
  }
`;

export const StyledListItem = styled(ListItem)`
  border-left: 1px solid black;
  &:hover {
    color: #007f7f;
  }
`;
