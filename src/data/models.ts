export interface Sales {
  date: number;
  country: Country;
  productA: number;
  productB: number;
  productC: number;
}
export type GlobalSales = Omit<Sales, "country">;

export interface SharePrice {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface MarketShare {
  year: number;
  country: Country;
  ourCompany: number;
  competitor1: number;
  competitor2: number;
  others: number;
}
export type GlobalMarketShare = Omit<MarketShare, "country">;

export interface KPI {
  revenueThisYear: number;
  salesThisYear: number;
  globalMarketShare: number;
  operatingCountries: number;
}

export const COUNTRIES = ["USA", "Germany", "Egypt", "Qatar"] as const;
export type Country = (typeof COUNTRIES)[number];

export const COMPANIES = [
  "ourCompany",
  "competitor1",
  "competitor2",
  "others",
] as const;
export type Company = (typeof COMPANIES)[number];

export const PRODUCTS = ["productA", "productB", "productC"] as const;
export type Product = (typeof PRODUCTS)[number];
