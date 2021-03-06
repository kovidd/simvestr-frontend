import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { formatCurrency } from "../../helpers";
import { portfolioHistory } from "../../services/portfolio";

const options = {
  chart: {
    toolbar: {
      show: false,
    },
  },
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
};

export const HistoricChart = ({ netPortfolio }) => {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    async function getHistoricBalance() {
      const res = await portfolioHistory();
      if (!res.error) {
        console.log(res.data);
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
        console.error("error getting the portfolio history");
      }
    }
    getHistoricBalance();
  }, [netPortfolio, setSeries]);

  return (
    series.length > 0 && (
      <ReactApexChart
        series={series}
        options={options}
        type="area"
        height={250}
        width="100%"
      />
    )
  );
};
