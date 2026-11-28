import { COMPANIES, type MarketShare, type Sales } from "./models";

export default function toGlobalMarketShare(
  data: MarketShare[],
): GlobalMarketShare[] {
  return getUniqueDates(data).map((date) => {
    const sharesForYear = data.filter((share) => share.date === date);
    const totals: GlobalMarketShare = {
      date,
      ourCompany: 0,
      competitor1: 0,
      competitor2: 0,
      others: 0,
    };

    for (const share of sharesForYear) {
      for (const company of COMPANIES) {
        totals[company] += share[company];
      }
    }

    if (sharesForYear.length > 0) {
      for (const company of COMPANIES) {
        totals[company] /= sharesForYear.length;
      }
    }

    return totals;
  });
}

type GlobalMarketShare = Omit<MarketShare, "country">;
type GlobalSales = Omit<Sales, "country">;

export function toGlobalSales(data: Sales[]): GlobalSales[] {
  return getDates(data).map((date) => {
    const salesForDate = data.filter((sale) => sale.date === date);

    const totals: GlobalSales = {
      date,
      productA: 0,
      productB: 0,
      productC: 0,
    };

    for (const sale of salesForDate) {
      totals.productA += sale.productA;
      totals.productB += sale.productB;
      totals.productC += sale.productC;
    }

    return totals;
  });
}

function getUniqueDates(data: { date: number }[]) {
  const uniqueYears = new Set(data.map((share) => share.date));
  return [...uniqueYears].sort((left, right) => left - right);
}

function getDates(data: { date: Sales["date"] }[]) {
  const uniqueDates = new Set(data.map((sale) => sale.date));
  return [...uniqueDates].sort((left, right) => left - right);
}
