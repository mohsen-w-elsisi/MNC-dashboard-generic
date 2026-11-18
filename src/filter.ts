import type { Country, Product } from "./data/models";
import { BehaviorSubject, combineLatest } from "rxjs";

export const countryFilter = new BehaviorSubject<Country | null>(null);
export const productFilter = new BehaviorSubject<Product | null>(null);
export const filters = combineLatest({
  country: countryFilter,
  product: productFilter,
});
