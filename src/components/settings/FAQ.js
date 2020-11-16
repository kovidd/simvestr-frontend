import React from "react";
import { Typography, Box } from "@material-ui/core";

const faqs = [
  {
    question: "Who is simvestr for?",
    answer:
      "For potential new investors who want to practice their trading skills without risking real capital.",
  },
  {
    question: "Can you give me an overview of simvestr?",
    answer:
      "The main features of Simvestr allows investors to simulate placing 'buy' and 'sell' orders. An investor can simulate placing a buy order at the current market price for a given number of units of a given stock, after which the stock units for which the order was placed are 'simul-owned' (since no real stock units are actually owned). Investors can also simulate placing sell orders for stock units that they 'simul-own'",
  },
  {
    question: "Tell me more about searching?",
    answer:
      "Investors can look for stocks using a 'stock code', with the search result showing the stock name, and latest available unit stock price.",
  },
  {
    question: "What is a watchlist?",
    answer:
      "A watchlist is a list of stocks that the investor wants to keep track of. These stocks can be added and removed, and whilst in the watchlist will show details of the stock code, the latest available unit stock price, and the percentage change in the stock unit price when comparing the latest available stock unit price to the previous day's known stock unit price.",
  },
  {
    question: "How can I visualise my watchlist?",
    answer:
      "To help with visualising the trend of a stock's price, investors can choose to view a graph showing the historical daily closing unit price of any stock selected from their watchlist. The system will then depict historical data for the selected stock from at least the day when the stock was added to the investor's watchlist.",
  },
  {
    question: "How can I tell how I am doing?",
    answer:
      "In order to help investors understand the consequences of their trading history, Simvestr provides a number of reporting capabilities. First, at any time, an investor can see the total profit or loss they would make if all of the current stock units they currently simul-own were sold at their current market price per unit. To also gain some insight into the performance of individual stocks, investors can view the total profit or loss they would make for any given stock that they simul-own, if all the units they own for that stock were sold at the current market price per unit. Finally, each investor can also see a page listing aggregate statistics for each simul-ownedstock, including: total units simul-owned, total current worth of simul-owned units, total paid for currently simul-owned units.",
  },
  {
    question: "Are there any additional features I should know about?",
    answer:
      "Yes, investers can see a leader board of all the investers currently registered with Simvestr, to gain an insight on how well they are doing compared to other Simvestr users. It is also possible to download their portfolio detail in CSV format for further analysis in spreadsheet software or other simulation applications.",
  },
];
export const FAQ = () => {
  return (
    <Box>
      {faqs.map(({ question, answer }) => (
        <Box key={question} mt="1rem">
          <Typography variant="subtitle2" color="primary">
            {question.toUpperCase()}
          </Typography>
          <Typography variant="body1">{answer}</Typography>
        </Box>
      ))}
    </Box>
  );
};
