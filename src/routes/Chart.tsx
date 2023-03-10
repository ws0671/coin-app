import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
  isDark: boolean;
}
interface ICandleChartItem {
  x: Date;
  y: number[];
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            width="500"
            height="200px"
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) =>
                  new Date(price.time_close * 1000).toISOString()
                ),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            width="500"
            height="200px"
            series={[
              {
                name: "Price",
                data: data?.map((price) => {
                  return {
                    x: new Date(price.time_close * 1000),
                    y: [+price.open, +price.high, +price.low, +price.close],
                  };
                }) as ICandleChartItem[],
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },

              chart: {
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: {
                show: false,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                labels: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
                type: "datetime",
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#ff009d",
                    downward: "#0be881",
                  },
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
