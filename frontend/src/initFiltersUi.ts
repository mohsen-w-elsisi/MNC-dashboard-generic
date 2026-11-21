import type { Country, Product } from "./data/models";
import { countryFilter, productFilter } from "./filter";

export default function initFiltersUi(
  availableCountries: readonly Country[],
  availableProducts: readonly Product[],
) {
  const form = document.querySelector<HTMLFormElement>("#filters");
  const countrySelect =
    document.querySelector<HTMLSelectElement>("#country-dropdown");
  const productFieldset =
    document.querySelector<HTMLFieldSetElement>("#filters fieldset");

  if (!form || !countrySelect || !productFieldset) return;

  countrySelect.insertAdjacentHTML(
    "beforeend",
    availableCountries
      .map((country) => `<option value="${country}">${country}</option>`)
      .join(""),
  );

  productFieldset.insertAdjacentHTML(
    "beforeend",
    `
      <label>
        <input type="radio" name="product" value="" checked />
        All
      </label>
      ${availableProducts
        .map(
          (product) =>
            `
              <label>
                <input type="radio" name="product" value="${product}" />
                ${product.replace(/^product/, "Product ")}
              </label>
            `,
        )
        .join("")}
    `,
  );

  countrySelect.addEventListener("change", () => {
    countryFilter.next((countrySelect.value as Country) || null);
  });

  productFieldset.addEventListener("change", () => {
    const selected = form.querySelector<HTMLInputElement>(
      'input[name="product"]:checked',
    );
    productFilter.next((selected?.value as Product) || null);
  });
}
