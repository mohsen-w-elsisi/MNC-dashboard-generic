import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";

const root = am5.Root.new("share-price-chart");
const chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    wheelX: "panX",
    wheelY: "zoomX",
  })
);

// 2026 monthly close values from share_value.csv (128.10 -> 141.75) with OHLC ranges
const data = [
  { date: new Date(2026, 0, 1).getTime(), open: 126.90, high: 129.20, low: 126.10, close: 128.10 },
  { date: new Date(2026, 1, 1).getTime(), open: 128.10, high: 130.40, low: 127.50, close: 129.30 },
  { date: new Date(2026, 2, 1).getTime(), open: 129.30, high: 131.60, low: 128.80, close: 130.50 },
  { date: new Date(2026, 3, 1).getTime(), open: 130.50, high: 132.90, low: 129.90, close: 131.75 },
  { date: new Date(2026, 4, 1).getTime(), open: 131.75, high: 134.10, low: 131.00, close: 133.00 },
  { date: new Date(2026, 5, 1).getTime(), open: 133.00, high: 135.30, low: 132.20, close: 134.20 },
  { date: new Date(2026, 6, 1).getTime(), open: 134.20, high: 136.80, low: 133.60, close: 135.45 },
  { date: new Date(2026, 7, 1).getTime(), open: 135.45, high: 137.90, low: 134.80, close: 136.70 },
  { date: new Date(2026, 8, 1).getTime(), open: 136.70, high: 139.20, low: 136.00, close: 138.00 },
  { date: new Date(2026, 9, 1).getTime(), open: 138.00, high: 140.50, low: 137.40, close: 139.25 },
  { date: new Date(2026, 10, 1).getTime(), open: 139.25, high: 141.80, low: 138.60, close: 140.50 },
  { date: new Date(2026, 11, 1).getTime(), open: 140.50, high: 143.10, low: 139.80, close: 141.75 },
];

const xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "month", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {}),
  })
);

const yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {}),
  })
);

const series = chart.series.push(
  am5xy.CandlestickSeries.new(root, {
    xAxis,
    yAxis,
    valueXField: "date",
    openValueYField: "open",
    highValueYField: "high",
    lowValueYField: "low",
    valueYField: "close",
    tooltip: am5.Tooltip.new(root, {
      labelText: "Open: ${openValueY}\nHigh: ${highValueY}\nLow: ${lowValueY}\nClose: ${valueY}",
    }),
  })
);

series.data.setAll(data);