import deriveKPIs from "./deriveKPIs";
import type { Sales, MarketShare, SharePrice } from "./models";

export default async function fetchDataFromServer(serverUrl: string) {
  const salesResponse = await fetch(`${serverUrl}/api/sales`);
  const marketShareResponse = await fetch(`${serverUrl}/api/market-share`);
  const shareValueResponse = await fetch(`${serverUrl}/api/share-value`);

  const sales = (await salesResponse.json()) as Sales[];
  const marketShare = (await marketShareResponse.json()) as MarketShare[];
  const sharePrice = (await shareValueResponse.json()) as SharePrice[];

  return {
    sales,
    marketShare,
    sharePrice,
    kpi: deriveKPIs(marketShare, sales),
  };
}
