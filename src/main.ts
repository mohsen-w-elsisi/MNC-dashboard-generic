import "./style.css";
import createCharts from "./charts/index.ts";
import mockData from "./data/mockData/index.ts";
import setupTabs from "./tabs.ts";

console.log("hello world!");

setupTabs({
  button1: "button-tab-1",
  button2: "button-tab-2",
  tab1: "tab-1",
  tab2: "tab-2",
});

createCharts(mockData, {
  marketShareTimeseriesChart: "market-share-timeseries",
  sharePriceChart: "share-price-chart",
  salesBarChart: "sales-bar-chart",
  salesTimeseriesChart: "sales-timeseries",
  marketShareChloropleth: "market-share-chloropleth",
  kpi: {
    revenueThisYear: "revenue-this-year",
    salesThisYear: "sales-this-year",
    globalMarketShare: "global-market-share",
    operatingCountries: "operating-countries",
  },
});
