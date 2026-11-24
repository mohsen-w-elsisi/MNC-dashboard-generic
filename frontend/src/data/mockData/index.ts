import type { KPI, MarketShare, Sales, SharePrice } from "../models";
import deriveKPIs from "../deriveKPIs";
import mockData from "./data.json";

// new code to link backend to frontend.
//const flaskURL = "http://127.0.0.1:5000";

// const sales = await(await fetch(`${flaskURL}/api/sales`)).json() as Sales[];
// const marketShare = await(await fetch(`${flaskURL}/api/market-share`)).json() as MarketShare[];
// const sharePrice = await(await fetch(`${flaskURL}/api/share-value`)).json() as SharePrice[];

const marketShare = mockData.marketShare.map(({ year, ...other }) => ({
  ...other,
  year: new Date(year, 0).getTime(),
})) as MarketShare[];

const sales = mockData.sales.map(({ year, ...other }) => ({
  ...other,
  date: new Date(year, 0).getTime(),
})) as Sales[];

const sharePrice = mockData.sharePrice.map(({ date, ...other }) => ({
  ...other,
  date: new Date(date).getTime(),
})) as SharePrice[];

export default {
  marketShare,
  sharePrice,
  sales,
  kpi: deriveKPIs(marketShare, sales),
};
