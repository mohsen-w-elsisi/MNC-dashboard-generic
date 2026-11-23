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
import { BasicTimeSeriesChart, seriesAnimationConfig } from "./common";

export default function createSalesTimeseriesChart(
  data: Sales[],
  rootId: string,
) {
  new SalesTimeSeriesChart(rootId, data);
}

class SalesTimeSeriesChart extends BasicTimeSeriesChart<Sales> {
  constructor(rootId: string, data: Sales[]) {
    super(rootId, data, "Date", "Sales ($)");
  }

  protected filters(): typeof filters {
    return filters;
  }

  protected createSeries(): void {
    this.chart.series.clear();
    PRODUCTS.forEach((product) => {
      this.createProductSeries(product, this.data);
    });
  }

  protected updateSeries({
    country,
    product,
  }: {
    country: Country | null;
    product: Product | null;
  }) {
    const regionalData = country
      ? this.data.filter((sale) => sale.country === country)
      : toGlobalSales(this.data);

    if (product) {
      this.chart.series.each((series) => {
        series.data.setAll(regionalData);
        if (series.get("name") == product) series.show(100);
        else series.hide(100);
      });
    } else {
      this.chart.series.each((series) => {
        series.data.setAll(regionalData);
        series.show(100);
      });
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
        ...seriesAnimationConfig,
        tooltip: am5.Tooltip.new(this.root, {
          labelText: `{name}: {valueY}`,
        }),
      }),
    );
    series.data.setAll(regionalData);
  }
}
