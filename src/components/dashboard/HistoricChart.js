import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@material-ui/core";
import { formatCurrency } from "../../helpers";
import { portfolioHistory } from "../../services/portfolio";
import { NotificationContext } from "../ui/Notification";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  colors: ["#007f7f"],
  xaxis: {
    type: "datetime",
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  yaxis: {
    labels: {
      formatter: (value) => formatCurrency(value),
    },
  },
  tooltip: {
    y: {
      formatter: (value) => formatCurrency(value),
    },
  },
  fill: {
    colors: ["#005253"],
  },
};

export const HistoricChart = ({ netPortfolio }) => {
  const [series, setSeries] = useState([]);
  const { setNotification } = useContext(NotificationContext);
  useEffect(() => {
    async function getHistoricBalance() {
      const res = await portfolioHistory();
      if (!res.error) {
        setSeries([
          {
            name: "Total Portfolio",
            data: [
              ...res.data.history.map((entry) => ({
                x: entry.timestamp * 1000, // convert to ms
                y: entry.total_value,
              })),
              {
                x: Date.now(),
                y: netPortfolio,
              },
            ],
          },
        ]);
      } else {
        setNotification("error getting the portfolio history");
      }
    }
    netPortfolio && getHistoricBalance();
  }, [netPortfolio, setSeries, setNotification]);

  return (
    <Box overflow="hidden">
      {series.length > 0 && (
        <ReactApexChart
          series={series}
          options={options}
          type="area"
          height={250}
          width="100%"
        />
      )}
    </Box>
  );
};
