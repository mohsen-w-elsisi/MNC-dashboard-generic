import {
  PRODUCTS,
  type Country,
  type GlobalSales,
  type Product,
  type Sales,
} from "../data/models";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import { toGlobalSales } from "../data/transformations";
import { filters } from "../filter";

export default function createSalesTimeseriesChart(
  data: Sales[],
  rootId: string,
) {
  new SalesTimeSeriesChart(rootId, data);
}

class SalesTimeSeriesChart {
  private readonly data: Sales[];

  private root: am5.Root;
  private chart: am5xy.XYChart;
  private xAxis: am5xy.DateAxis<am5xy.AxisRendererX>;
  private yAxis: am5xy.ValueAxis<am5xy.AxisRendererY>;

  constructor(rootId: string, data: Sales[]) {
    this.data = data;

    this.root = am5.Root.new(rootId);
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        wheelX: "panX",
        wheelY: "zoomX",
      }),
    );

    this.xAxis = this.chart.xAxes.push(
      am5xy.DateAxis.new(this.root, {
        baseInterval: { timeUnit: "year", count: 1 },
        gridIntervals: [{ timeUnit: "year", count: 1 }],
        renderer: am5xy.AxisRendererX.new(this.root, {}),
      }),
    );

    this.yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(this.root, {}),
      }),
    );

    filters.subscribe(({ product, country }) =>
      this.updateSeries(product, country),
    );
  }

  private updateSeries(product: Product | null, country: Country | null) {
    this.chart.series.clear();

    const regionalData = country
      ? this.data.filter((sale) => sale.country === country)
      : toGlobalSales(this.data);

    if (product) {
      this.createProductSeries(product, regionalData);
    } else {
      PRODUCTS.forEach((product) =>
        this.createProductSeries(product, regionalData),
      );
    }
  }

  private createProductSeries(product: Product, regionalData: GlobalSales[]) {
    const series = this.chart.series.push(
      am5xy.LineSeries.new(this.root, {
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueYField: product,
        valueXField: "date",
        name: product,
      }),
    );
    series.data.setAll(regionalData);
  }
}
