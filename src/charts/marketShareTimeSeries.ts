import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { COUNTRIES, type MarketShare } from "../data/models";

export default function createMarketShareTimeseriesChart(
  data: MarketShare[],
  rootId: string,
) {
  const root = am5.Root.new(rootId);
  const chart = root.container.children.push(
    am5xy.XYChart.new(root, { panX: true, wheelX: "panX", wheelY: "zoomX" }),
  );

  const xAxis = chart.xAxes.push(
    am5xy.DateAxis.new(root, {
      baseInterval: { timeUnit: "year", count: 1 },
      gridIntervals: [{ timeUnit: "year", count: 1 }],
      renderer: am5xy.AxisRendererX.new(root, {}),
    }),
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      min: 0,
      renderer: am5xy.AxisRendererY.new(root, {}),
    }),
  );

  for (const country of COUNTRIES) {
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        xAxis,
        yAxis,
        valueYField: "ourCompany",
        valueXField: "year",
        name: country,
        hue: Math.random() * 360,
      }),
    );

    series.strokes.template.setAll({ strokeWidth: 3 });

    series.data.setAll(data.filter((d) => d.country === country));
  }
}
