import type { KPI, MarketShare, Sales, SharePrice } from "../models";
import deriveKPIs from "../deriveKPIs";
import mockData from "./data.json";

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
