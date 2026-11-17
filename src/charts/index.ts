import type { KPI, MarketShare, SharePrice, Sales } from "../data/models";

import createMarketShareChloropleth from "./marketShareChloropleth";
import createMarketShareTimeseriesChart from "./marketShareTimeSeries";
import createSalesBarChart from "./salesBarChart";
import createSalesTimeseriesChart from "./salesTimeSeries";
import createSharePriceChart from "./shareValueCandleStick";
import updateKPIs from "./kpis";

export default function createCharts(
  data: {
    marketShare: MarketShare[];
    sharePrice: SharePrice[];
    sales: Sales[];
    kpi: KPI;
  },
  rootIds: {
    marketShareTimeseriesChart: string;
    sharePriceChart: string;
    salesBarChart: string;
    salesTimeseriesChart: string;
    marketShareChloropleth: string;
    kpi: {
      revenueThisYear: string;
      salesThisYear: string;
      globalMarketShare: string;
      operatingCountries: string;
    };
  },
) {
  updateKPIs(data.kpi, rootIds.kpi);

  createMarketShareTimeseriesChart(
    data.marketShare,
    rootIds.marketShareTimeseriesChart,
  );

  createSharePriceChart(data.sharePrice, rootIds.sharePriceChart);

  createSalesBarChart(data.sales, rootIds.salesBarChart);

  createSalesTimeseriesChart(data.sales, rootIds.salesTimeseriesChart);

  createMarketShareChloropleth(
    data.marketShare,
    rootIds.marketShareChloropleth,
  );
}
