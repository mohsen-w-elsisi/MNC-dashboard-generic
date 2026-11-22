import type { MdRadio } from "@material/web/radio/radio";
import type { Country, Product } from "./data/models";
import { countryFilter, productFilter } from "./filter";
import type { MdOutlinedSelect } from "@material/web/select/outlined-select.js";

export default function initFiltersUi(
  availableCountries: readonly Country[],
  availableProducts: readonly Product[],
) {
  const form = document.querySelector<HTMLFormElement>("#filters");
  const countrySelect = document.querySelector<MdOutlinedSelect>(
    "#filters md-outlined-select",
  );
  const productRadioGroup = document.querySelector<HTMLDivElement>(
    "#filters #product-radio-group",
  );

  if (!form || !countrySelect || !productRadioGroup) return;

  countrySelect.insertAdjacentHTML(
    "beforeend",
    availableCountries.map(countrySelecttionOption).join(""),
  );

  productRadioGroup.insertAdjacentHTML(
    "beforeend",
    availableProducts.map(productRadioOption).join(""),
  );

  countrySelect.addEventListener("change", () => {
    countryFilter.next((countrySelect.value as Country) || null);
  });

  productRadioGroup.addEventListener("change", (event) => {
    const selected = event.target as MdRadio;
    productFilter.next((selected.value as Product) || null);
  });
}

function countrySelecttionOption(country: Country) {
  return `<md-select-option value="${country}">
            <p slot="headline">${country}</p>
          </md-select-option>`;
}

function productRadioOption(product: Product) {
  return `
    <span>
      <md-radio id="product-${product}" name="product" value="${product}"></md-radio>
      <label for="product-${product}">${product}</label>
    </span>
  `;
}
