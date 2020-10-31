import React from "react";
import "../../index.css";
import {
  Box,
  Typography,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";

const StyledH3 = styled.h3` font-size:26px;`;
const StyledH4 = styled.h4` font-size:22px;`;

export const FAQ = () => {
  return (
    <MainWrapper>
      <Box
        height="100%"
        alignItems="center"
        p="2rem"
        paddingTop="0"
      >
    <div fontSize="10" align="center" >
      <Typography variant="h2" align="center">
        Simvestr
      </Typography>
      <StyledH3> Frequently Asked Questions </StyledH3>
      For potential new investors often want to practice their trading skills without risking real capital
      <StyledH4>SEARCHING</StyledH4>
      Investors can look for stocks using a "stock code", with the search result howing the stock name, <br />
       and latest available unit stock price.
      <StyledH4> WATCHLIST</StyledH4> 
      The investor can then decide to add the stock to their watchlist, but can also remove it later on. Hence, this watchlist includes<br />
      a list of stocks that the investor wants to keep track of, where each of these stocks includes details on: the stock code, <br />
      latest available unit stock price, and the percentage change in the stock unit pricewhen comparing the latest available stock<br />
      unit price to the previous day's known stock unit price.<br />
      
      <StyledH4>VISUALISATION</StyledH4> 
       To help with visualising the trend of a stock's price, investors can also choose to view a graph showing the historical daily closing <br />
       unit price of any stock selected from their watchlist. The system will then depict historical data for the selected stock from at least the day<br />
       when the stock was added to the investor's watchlist. The main features of the platform allow investors to simulate placing "buy" and "sell" orders.<br />
       An investor can simulate placing a buy order at the current market price for a given number of units of a given stock, after which the stock units<br />
       for which the order was placed are "simul-owned" (since no real stock units are actually owned).<br />
       Investors can also simulate placing sell orders for stock units that they "simul-own". In order to help investors understand the consequences of<br />
       their trading history, Simvestr provides a number of reporting capabilities. First, at any time, an investor can see the total profit or loss <br />
       they would make if all of the current stock units they currently simul-own were sold at their current market price per unit. To also gain some insight <br />
       into the performance of individual stocks, investors can view the total profit or loss they would make for any given stock that they simul-own, if all <br />
       the units they own for that stock were sold at the current market price per unit. Finally, each investor can also see a page listing aggregate statistics <br />
       for each simul-ownedstock, including: total units simul-owned, total current worth of simul-owned units, total paid for currently simul-owned units
     
</div>
      </Box>
    </MainWrapper>
  );
};
