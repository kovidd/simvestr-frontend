import React from "react";
import "../../index.css";
import { Typography } from "@material-ui/core";
import { MainWrapper } from "../ui";
import styled from "styled-components";

const StyledH3 = styled.h3`
  font-size: 28px;
  text-align: center;
  margin: 10px 0 0;
  padding: 0;
`;
const StyledH4 = styled.h4`
  font-size: 18px;
  margin: 10px 0 0;
  padding: 0;
`;
const StyledP = styled.p`
  font-size: 16px;
  margin: 0 0 5px;
  padding: 0;
`;

const FAQ_Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FAQ = () => {
  return (
    <MainWrapper>
      <FAQ_Wrapper>
        <Typography variant="h2" align="center">
          Simvestr
        </Typography>
        <StyledH3> Frequently Asked Questions </StyledH3>
        <StyledH4>WHO IS SIMVESTR FOR?</StyledH4>
        <StyledP>
          For potential new investors who want to practice their trading skills
          without risking real capital
        </StyledP>
        <StyledH4>CAN YOU GIVE ME AN OVERVIEW OF SIMVESTR?</StyledH4>
        <StyledP>
          The main features of Simvestr allows investors to simulate placing
          &apos;buy&apos; and &apos;sell&apos; orders. An investor can simulate
          placing a buy order at the current market price for a given number of
          units of a given stock, after which the stock units for which the
          order was placed are &apos;simul-owned&apos; (since no real stock
          units are actually owned). Investors can also simulate placing sell
          orders for stock units that they &apos;simul-own&apos;.
        </StyledP>
        <StyledH4>TELL ME MORE ABOUT SEARCHING</StyledH4>
        <StyledP>
          Investors can look for stocks using a &apos;stock code&apos;, with the
          search result showing the stock name, and latest available unit stock
          price.
        </StyledP>
        <StyledH4> WHAT IS A WATCHLIST?</StyledH4>
        <StyledP>
          A watchlist is a list of stocks that the investor wants to keep track
          of. These stocks can be added and removed, and whilst in the watchlist
          will show details of the stock code, the latest available unit stock
          price, and the percentage change in the stock unit price when
          comparing the latest available stock unit price to the previous
          day&apos;s known stock unit price.
        </StyledP>
        <StyledH4>HOW CAN I VISUALISE MY WATCHLIST?</StyledH4>
        <StyledP>
          To help with visualising the trend of a stock&apos;s price, investors
          can choose to view a graph showing the historical daily closing unit
          price of any stock selected from their watchlist. The system will then
          depict historical data for the selected stock from at least the day
          when the stock was added to the investor&apos;s watchlist.
        </StyledP>
        <StyledH4>HOW CAN I TELL HOW I AM DOING?</StyledH4>
        <StyledP>
          In order to help investors understand the consequences of their
          trading history, Simvestr provides a number of reporting capabilities.
          First, at any time, an investor can see the total profit or loss they
          would make if all of the current stock units they currently simul-own
          were sold at their current market price per unit. To also gain some
          insight into the performance of individual stocks, investors can view
          the total profit or loss they would make for any given stock that they
          simul-own, if all the units they own for that stock were sold at the
          current market price per unit. Finally, each investor can also see a
          page listing aggregate statistics for each simul-ownedstock,
          including: total units simul-owned, total current worth of simul-owned
          units, total paid for currently simul-owned units.
        </StyledP>
        <StyledH4>
          ARE THERE ANY ADDITIONAL FEATURES I SHOULD KNOW ABOUT?
        </StyledH4>
        Yes, investers can see a leader board of all the investers currently
        registered with Simvestr, to gain an insight on how well they are doing
        compared to other Simvestr users. It is also possible to download their
        portfolio detail in CSV format for further analysis in spreadsheet
        software or other simulation applications.
        <StyledP></StyledP>
      </FAQ_Wrapper>
    </MainWrapper>
  );
};
