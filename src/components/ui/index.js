import React from "react";
import styled from "styled-components";
import {
  Container,
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Typography,
  TableCell,
<<<<<<< HEAD
  ListItemText,
  ListItem,
=======
  useTheme,
  useMediaQuery,
>>>>>>> 4a28b33210411e26bef6488935b3504bc8478a7e
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";

const Terminal = styled.div`
  border: 14px solid rgba(0, 127, 127, 1);
  &:hover {
    border-color: rgba(0, 127, 127, 0.8);
  }
  width: 100%;
  max-height: 100%;
  display: flex;
  overflow-y: auto;
`;

const StyledPaper = styled(Paper)`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 350px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  height: calc(100vh - 2rem);
`;

export const MainWrapper = ({ children }) => {
  const location = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  const maxWidth = ["/signup", "/login"].includes(location.pathname)
    ? "sm"
    : "md";
  return (
    <StyledContainer maxWidth={maxWidth} md={matches}>
      <Box
        display="flex"
        flex="1"
        mt={matches ? "2rem" : "1rem"}
        alignItems="flex-start"
        justifyContent="center"
        minHeight={matches ? "350px" : "100%"}
      >
        <Terminal>
          <StyledPaper square elevation={10}>
            {![
              "/",
              "/signup",
              "/login",
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
    </StyledContainer>
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
