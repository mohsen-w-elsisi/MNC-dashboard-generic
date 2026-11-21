import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import {
  COMPANIES,
  type Company,
  type Country,
  type GlobalMarketShare,
  type MarketShare,
} from "../data/models";
import toGlobalMarketShare from "../data/transformations";
import { filters } from "../filter";

export default function createMarketShareTimeseriesChart(
  data: MarketShare[],
  rootId: string,
) {
  new MarketShareTimeSeriesChart(rootId, data);
}

class MarketShareTimeSeriesChart {
  private readonly data: MarketShare[];

  private root: am5.Root;
  private chart: am5xy.XYChart;
  private xAxis: am5xy.DateAxis<am5xy.AxisRendererX>;
  private yAxis: am5xy.ValueAxis<am5xy.AxisRendererY>;

  constructor(rootId: string, data: MarketShare[]) {
    this.data = data;

    this.root = am5.Root.new(rootId);
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: true,
        wheelX: "panX",
        wheelY: "zoomX",
        cursor: am5xy.XYCursor.new(this.root, {
          behavior: "zoomX",
        }),
        maxTooltipDistance: 0,
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
        max: 100,
        renderer: am5xy.AxisRendererY.new(this.root, {}),
      }),
    );

    filters.subscribe(({ country }) => this.updateSeries(country));

    this.updateSeries(null);
  }

  private updateSeries(country: Country | null) {
    this.chart.series.clear();

    const regionalData = country
      ? this.data.filter((share) => share.country === country)
      : toGlobalMarketShare(this.data);

    COMPANIES.forEach((company) =>
      this.createCompanySeries(company, regionalData),
    );
  }

  private createCompanySeries(
    company: Company,
    regionalData: GlobalMarketShare[] | MarketShare[],
  ) {
    const series = this.chart.series.push(
      am5xy.LineSeries.new(this.root, {
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        valueYField: company,
        valueXField: "year",
        name: company,
        tooltip: am5.Tooltip.new(this.root, {
          labelText: `{name}: {valueY}%`,
        }),
      }),
    );

    series.strokes.template.setAll({ strokeWidth: 3 });
    series.data.setAll(regionalData);
  }
}
