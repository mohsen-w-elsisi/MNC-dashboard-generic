import type { KPI, MarketShare, Sales } from "./models";

function deriveSalesThisYear(sales: Sales[]): number {
  const latestSalesYear = Math.max(
    ...sales.map((sale) => new Date(sale.date).getUTCFullYear()),
  );
  const latestSales = sales.filter(
    (sale) => new Date(sale.date).getUTCFullYear() === latestSalesYear,
  );

  return latestSales.reduce(
    (total, sale) => total + sale.productA + sale.productB + sale.productC,
    0,
  );
}

function deriveRevenueThisYear(sales: Sales[]): number {
  return deriveSalesThisYear(sales);
}

function deriveGlobalMarketShare(marketShare: MarketShare[]): number {
  const latestMarketShareYear = Math.max(
    ...marketShare.map((share) => new Date(share.year).getUTCFullYear()),
  );
  const latestMarketShare = marketShare.filter(
    (share) => new Date(share.year).getUTCFullYear() === latestMarketShareYear,
  );
  const globalMarketShare = latestMarketShare.length
    ? latestMarketShare.reduce((total, share) => total + share.ourCompany, 0) /
      latestMarketShare.length
    : 0;

  return globalMarketShare;
}

function deriveOperatingCountries(sales: Sales[]): number {
  return new Set(sales.map((sale) => sale.country)).size;
}

export default function deriveKPIs(
  marketShare: MarketShare[],
  sales: Sales[],
): KPI {
  return {
    revenueThisYear: deriveRevenueThisYear(sales),
    salesThisYear: deriveSalesThisYear(sales),
    globalMarketShare: deriveGlobalMarketShare(marketShare),
    operatingCountries: deriveOperatingCountries(sales),
  };
}
