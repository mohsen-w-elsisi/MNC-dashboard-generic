import "./styles/style.css";

import "@material/web/button/outlined-button.js";
import "@material/web/select/outlined-select.js";
import "@material/web/select/select-option.js";
import "@material/web/radio/radio.js";

import setupTabs from "./tabs.ts";
import createCharts from "./charts/index.ts";
import mockData from "./data/mockData/index.ts";
import initFiltersUi from "./initFiltersUi.ts";
import { COUNTRIES, PRODUCTS } from "./data/models.ts";

console.log("hello world!");

setupTabs({
  button1: "button-tab-1",
  button2: "button-tab-2",
  tab1: "tab-1",
  tab2: "tab-2",
});

initFiltersUi(COUNTRIES, PRODUCTS);

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
