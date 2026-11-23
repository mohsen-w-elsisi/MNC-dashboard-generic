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
import { countryFilter } from "../filter";
import { BasicTimeSeriesChart, seriesAnimationConfig } from "./common";

export default function createMarketShareTimeseriesChart(
  data: MarketShare[],
  rootId: string,
) {
  new MarketShareTimeSeriesChart(rootId, data);
}

class MarketShareTimeSeriesChart extends BasicTimeSeriesChart<MarketShare> {
  constructor(rootId: string, data: MarketShare[]) {
    super(rootId, data, "Year", "Market Share (%)");
  }

  protected filters(): typeof countryFilter {
    return countryFilter;
  }

  protected createSeries(): void {
    this.chart.series.clear();

    COMPANIES.forEach((company) => {
      this.createCompanySeries(company, this.data);
    });
  }

  protected updateSeries(country: Country | null) {
    const regionalData = country
      ? this.data.filter((share) => share.country === country)
      : toGlobalMarketShare(this.data);

    this.chart.series.each((series) => {
      series.data.setAll(regionalData);
      series.show(100);
    });
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
        ...seriesAnimationConfig,
        tooltip: am5.Tooltip.new(this.root, {
          labelText: `{name}: {valueY}%`,
        }),
      }),
    );

    series.strokes.template.setAll({ strokeWidth: 3 });
    series.data.setAll(regionalData);
  }
}
