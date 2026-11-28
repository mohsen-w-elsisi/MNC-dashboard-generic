import deriveKPIs from "./deriveKPIs";
import type {
  Sales,
  MarketShare,
  SharePrice,
  StrategicObjectives,
} from "./models";

export default async function fetchDataFromServer(serverUrl: string) {
  const salesResponse = await fetch(`${serverUrl}/api/sales`);
  const marketShareResponse = await fetch(`${serverUrl}/api/market-share`);
  const shareValueResponse = await fetch(`${serverUrl}/api/share-value`);
  const strategicObjectivesResponse = await fetch(
    `${serverUrl}/api/strategic-objectives`,
  );

  const sales = (await salesResponse.json()) as Sales[];
  const marketShare = (await marketShareResponse.json()) as MarketShare[];
  const sharePrice = (await shareValueResponse.json()) as SharePrice[];
  const strategicObjectives =
    (await strategicObjectivesResponse.json()) as StrategicObjectives[];

  return {
    sales,
    marketShare,
    sharePrice,
    strategicObjectives,
    kpi: deriveKPIs(marketShare, sales),
  };
}
