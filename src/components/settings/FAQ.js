import React from "react";
import "../../index.css";
import {
  Box,
  Typography,
} from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";

const StyledH3 = styled.h3` font-size:28px; text-align:center; margin:10px 0 0; padding:0;`;
const StyledH4 = styled.h4` font-size:18px; margin:10px 0 0; padding:0;`;
const StyledP = styled.p` font-size:16px; margin:0 0 5px; padding:0;`;

const FAQ_Wrapper = styled.div` margin:0 2%;`;

export const FAQ = () => {
  return (
    <MainWrapper>
    <FAQ_Wrapper>
      <Typography variant="h2" align="center">
        Simvestr
      </Typography>
      <StyledH3> Frequently Asked Questions </StyledH3>
      <StyledH4>WHO IS SIMVESTR FOR?</StyledH4>
      <StyledP>For potential new investors who want to practice their trading skills without risking real capital</StyledP>
      <StyledH4>TELL ME MORE ABOUT SEARCHING</StyledH4>
      <StyledP>Investors can look for stocks using a &apos;stock code&apos;, with the search result showing the stock name, and latest available unit stock price.</StyledP>
      <StyledH4> WHAT IS A WATCHLIST?</StyledH4> 
      <StyledP>The investor can then decide to add the stock to their watchlist, but can also remove it later on. Hence, this watchlist includes<br />
      a list of stocks that the investor wants to keep track of, where each of these stocks includes details on: the stock code, <br />
      latest available unit stock price, and the percentage change in the stock unit pricewhen comparing the latest available stock<br />
      unit price to the previous day&apos;s known stock unit price.</StyledP>
      
      <StyledH4>HOW CAN I VISUALISE MY PORTFOLIO?</StyledH4> 
       <StyledP>To help with visualising the trend of a stock&apos;s price, investors can also choose to view a graph showing the historical daily closing <br />
       unit price of any stock selected from their watchlist. The system will then depict historical data for the selected stock from at<br /> least the day
       when the stock was added to the investor&apos;s watchlist. </StyledP>
      <StyledH4>HOW CAN I VISUALISE MY PORTFOLIO?</StyledH4> 
      <StyledP>The main features of the platform allow investors to simulate placing &apos;buy&apos; and &apos;sell&apos; orders.<br />
       An investor can simulate placing a buy order at the current market price for a given number of units of a given stock, after which the stock units<br />
       for which the order was placed are &apos;simul-owned&apos; (since no real stock units are actually owned).</StyledP>
      <StyledH4>HOW CAN I BUY AND SELL STOCKS?</StyledH4> 
       <StyledP>Investors can also simulate placing sell orders for stock units that they &apos;simul-own&apos;. In order to help investors understand the consequences of<br />
       their trading history, Simvestr provides a number of reporting capabilities. First, at any time, an investor can see the total profit or loss <br />
       they would make if all of the current stock units they currently simul-own were sold at their current market price per unit. To also gain some insight <br />
       into the performance of individual stocks, investors can view the total profit or loss they would make for any given stock that they simul-own, if all <br />
       the units they own for that stock were sold at the current market price per unit. Finally, each investor can also see a page listing aggregate statistics <br />
       for each simul-ownedstock, including: total units simul-owned, total current worth of simul-owned units, total paid for currently simul-owned units</StyledP>
     
	</FAQ_Wrapper>

    </MainWrapper>
  );
};
