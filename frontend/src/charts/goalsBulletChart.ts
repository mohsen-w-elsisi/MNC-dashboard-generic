import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { createXYChart } from "./common";

const root = am5.Root.new("bullet-chart");
const chart = root.container.children.push(createXYChart(root));

const data = [
  { category: "Egypt (2026)", value: 41.0, target: 38.0 },
  { category: "USA (2026)", value: 36.5, target: 35.0 },
  { category: "Germany (2026)", value: 29.5, target: 30.0 },
  { category: "Qatar (2025)", value: 26.0, target: 28.0 },
];

const yAxis = chart.yAxes.push(
  am5xy.CategoryAxis.new(root, {
    categoryField: "category",
    renderer: am5xy.AxisRendererY.new(root, {}),
  }),
);
yAxis.data.setAll(data);

const xAxis = chart.xAxes.push(
  am5xy.ValueAxis.new(root, {
    min: 0,
    max: 60,
    renderer: am5xy.AxisRendererX.new(root, {}),
  }),
);

[
  [0, 20, 0x9ca3af],
  [20, 40, 0xd1d5db],
  [40, 60, 0xf3f4f6],
].forEach(([start, end, color]) => {
  const rangeDataItem = xAxis.makeDataItem({ value: start, endValue: end });
  xAxis.createAxisRange(rangeDataItem);
  rangeDataItem.get("axisFill")?.setAll({
    fill: am5.color(color),
    fillOpacity: 0.4,
    visible: true,
  });
});

const bar = chart.series.push(
  am5xy.ColumnSeries.new(root, {
    xAxis,
    yAxis,
    valueXField: "value",
    categoryYField: "category",
    //TODO: tooltip not working
    tooltip: am5.Tooltip.new(root, {
      labelText: "{categoryY}: [bold]{valueX}%[/] (Target: {target}%)",
    }),
  }),
);
bar.columns.template.setAll({
  height: am5.percent(35),
  fill: am5.color(0x1e3a8a),
});
bar.data.setAll(data);

const target = chart.series.push(
  am5xy.StepLineSeries.new(root, {
    xAxis,
    yAxis,
    valueXField: "target",
    categoryYField: "category",
    noRisers: true,
    stepWidth: am5.percent(65),
  }),
);

target.strokes.template.setAll({ stroke: am5.color(0xdc2626), strokeWidth: 4 });
target.data.setAll(data);
