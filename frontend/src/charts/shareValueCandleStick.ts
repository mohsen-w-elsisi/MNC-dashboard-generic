import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import type { SharePrice } from "../data/models";
import {
  createXlabel,
  createXYChart,
  createYlabel,
  seriesAnimationConfig,
} from "./common";

export default function createSharePriceChart(
  data: SharePrice[],
  rootId: string,
) {
  const root = am5.Root.new(rootId);
  const chart = root.container.children.push(createXYChart(root));

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "month", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {}),
    }),
  );

  xAxis.children.push(createXlabel(root, "Date"));

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  );

  yAxis.children.unshift(createYlabel(root, "Share Price ($)"));

  const series = chart.series.push(
    am5xy.CandlestickSeries.new(root, {
      xAxis,
      yAxis,
      valueXField: "date",
      openValueYField: "open",
      highValueYField: "high",
      lowValueYField: "low",
      valueYField: "close",
      ...seriesAnimationConfig,
      tooltip: am5.Tooltip.new(root, {
        labelText:
          "Open: ${openValueY}\nHigh: ${highValueY}\nLow: ${lowValueY}\nClose: ${valueY}",
      }),
    }),
  );

  series.data.setAll(data);
}
