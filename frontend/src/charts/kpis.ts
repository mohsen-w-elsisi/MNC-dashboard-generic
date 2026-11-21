import type { KPI } from "../data/models";

export default function updateKPIs(
  data: KPI,
  htmlIds: {
    revenueThisYear: string;
    salesThisYear: string;
    globalMarketShare: string;
    operatingCountries: string;
  },
) {
  const formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const formatNumber = new Intl.NumberFormat("en-US");

  const revenue = document.querySelector(
    `#${htmlIds.revenueThisYear} .kpi-value`,
  );
  const sales = document.querySelector(
    `#${htmlIds.salesThisYear} .kpi-value`,
  );
  const marketShare = document.querySelector(
    `#${htmlIds.globalMarketShare} .kpi-value`,
  );
  const countries = document.querySelector(
    `#${htmlIds.operatingCountries} .kpi-value`,
  );

  if (revenue) revenue.textContent = formatCurrency.format(data.revenueThisYear);
  if (sales) sales.textContent = formatNumber.format(data.salesThisYear);
  if (marketShare) {
    marketShare.textContent = `${data.globalMarketShare.toFixed(1)}%`;
  }
  if (countries) {
    countries.textContent = formatNumber.format(data.operatingCountries);
  }
}