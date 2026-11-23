import type { KPI, MarketShare, SharePrice, Sales } from "../data/models.ts";

import "./goalsBulletChart.ts";

import createMarketShareChloropleth from "./marketShareChloropleth.ts";
import createMarketShareTimeseriesChart from "./marketShareTimeSeries.ts";
import createSalesBarChart from "./salesBarChart.ts";
import createSalesTimeseriesChart from "./salesTimeSeries.ts";
import updateKPIs from "./kpis.ts";
import createSharePriceChart from "./shareValueCandleStick.ts";

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
