import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import * as dayjs from "dayjs";
import ReactApexChart from "react-apexcharts";

import { addStock } from "../../services/watchlist";
import { stockCandles } from "../../services/stock";
import { NotificationContext } from "../ui/Notification";
import { WatchlistAddConfirmation } from "../watchlist/WatchListConfirmation";
import {
  changeArrow,
  formatPerc,
  getQuoteChange,
  getQuoteChangePerc,
} from "../../helpers";

/**
 * Converts the candle data to the respective chart data
 */
function parseCandles(candles) {
  return candles.t.map((timestamp, index) => ({
    x: new Date(timestamp * 1000),
    y: [candles.o[index], candles.h[index], candles.l[index], candles.c[index]],
  }));
}

const StyledTab = styled(Tab)`
  &&&&& {
    width: 3rem;
    min-width: 3rem;
    max-width: 3rem;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: baseline;
  & > * {
    padding-right: 0.25rem;
  }
`;

const PriceTypography = styled(Typography)`
  && {
    color: ${(props) => (props.change > 0 ? "green" : "red")};
  }
`;

const rangeCopy = {
  W: "week",
  M: "month",
  Y: "year",
};

const getOptions = (range) => ({
  chart: {
    type: "candlestick",
    height: "100%",
    width: "100%",
    toolbar: {
      show: false,
    },
    offsetY: -15,
  },
  xaxis: {
    type: "category",
    labels: {
      show: false,
      formatter: function (val) {
        return dayjs(val).format(
          range === "Y" ? "MMM DD YYYY" : "MMM DD HH:mm"
        );
      },
    },
    tooltip: {
      style: {
        fontFamily: "inherit",
        fontSize: 12,
      },
      offsetY: -10,
    },
  },
  yaxis: {
    decimalsInFloat: 1,
    tooltip: {
      enabled: true,
    },
    labels: {
      offsetX: -10,
      style: {
        fontSize: 12,
        fontFamily: "inherit",
      },
    },
  },
  grid: {
    padding: {
      left: 5,
      right: 5,
    },
  },
});

export const StockChart = ({ details, disableWatchlist = false }) => {
  const { setNotification } = useContext(NotificationContext);
  const [series, setSeries] = useState([]);
  const [range, setRange] = useState("W");
  const [open, setOpen] = useState(false);
  const options = getOptions(range);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getStockCandles(symbol, range) {
      setIsLoading(true);
      const res = await stockCandles(symbol, range);
      if (!res.error) {
        const dataPoints = parseCandles(res.data);
        setSeries([
          {
            name: "candle",
            data: dataPoints,
          },
        ]);
        setIsLoading(false);
      } else {
        setNotification({
          open: true,
          message: "Error getting the stock candles",
        });
      }
    }
    getStockCandles(details.symbol, range);
  }, [details.symbol, range, setNotification]);

  const handleAdd = async () => {
    const body = { symbol: details.symbol };
    const res = await addStock(body);
    if (res.error) {
      setNotification({
        open: true,
        message: `Error adding ${details.symbol} to watchlist`,
      });
    }
  };

  if (!details) return null;
  const change = getQuoteChange(details.quote.c, details.quote.pc);
  const changePerc = getQuoteChangePerc(details.quote.c, details.quote.pc);
  return (
    <>
      {!disableWatchlist && (
        <WatchlistAddConfirmation
          open={open}
          handleClose={() => setOpen(false)}
          stockSymbol={details.symbol}
        />
      )}
      <Box overflow="hidden">
        <Box ml="0.5rem" mt="1rem">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="baseline">
              {details.logo && (
                <img
                  alt="Stock Logo"
                  style={{
                    height: "24px",
                    marginRight: "0.5rem",
                    position: "relative",
                    top: "4px",
                  }}
                  src={details.logo}
                />
              )}
              <Typography variant="h5" style={{ marginRight: "1rem" }}>
                {details.name}
              </Typography>
              <Typography variant="subtitle1">
                {details.exchange}: {details.symbol} - {details.industry}
              </Typography>
            </Box>
            {!disableWatchlist && (
              <Box mr="1rem" position="relative" top="0.5rem">
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleAdd();
                    setOpen(true);
                  }}
                >
                  Add To Watchlist
                </Button>
              </Box>
            )}
          </Box>
          <PriceWrapper>
            <Typography variant="h6">{details.quote.c}</Typography>
            <Typography variant="body1" color="textSecondary">
              USD
            </Typography>
            <PriceTypography variant="body1" change={change}>{`${
              change > 0 ? "+" : ""
            }${change.toFixed(2)} (${formatPerc(
              Math.abs(changePerc)
            )})${changeArrow(changePerc)}`}</PriceTypography>
          </PriceWrapper>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box width="9rem">
            <Tabs
              variant="fullWidth"
              indicatorColor="primary"
              value={range}
              onChange={(_, newValue) => setRange(newValue)}
            >
              {/* <StyledTab value="D" label="D" /> */}
              <StyledTab value="W" label="W" />
              <StyledTab value="M" label="M" />
              <StyledTab value="Y" label="Y" />
            </Tabs>
          </Box>
          <Box mr="1rem">
            <Typography
              variant="body1"
              align="right"
            >{`Historical Performance - (last ${rangeCopy[range]})`}</Typography>
          </Box>
        </Box>
        <Box minHeight={270}>
          {isLoading ? (
            <Box
              minHeight={270}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          ) : (
            series.length > 0 && (
              <ReactApexChart
                options={options}
                series={series}
                type="candlestick"
                height={250}
                width="100%"
              />
            )
          )}
        </Box>
      </Box>
    </>
  );
};
