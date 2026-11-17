export interface Sales {
  date: number;
  country: Country;
  productA: number;
  productB: number;
  productC: number;
}

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

export interface KPI {
  revenueThisYear: number;
  salesThisYear: number;
  globalMarketShare: number;
  operatingCountries: number;
}

export const COUNTRIES = ["USA", "Germany", "Egypt", "Qatar"] as const;

export type Country = (typeof COUNTRIES)[number];

export type Product = "Product A" | "Product B" | "Product C";
