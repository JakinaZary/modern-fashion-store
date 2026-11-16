import { products } from "../data/products.js";
import { filterProducts } from "../modules/filters.js";
import { formatMoney, renderProductGrid } from "../modules/ui.js";

export function initShop() {
  const search = document.querySelector("#shop-search");
  const category = document.querySelector("#category-filter");
  const maxPrice = document.querySelector("#price-filter");
  const priceValue = document.querySelector("#price-value");
  const sort = document.querySelector("#sort-filter");
  const grid = document.querySelector("#shop-products");
  const count = document.querySelector("#results-count");
  const params = new URLSearchParams(window.location.search);
  search.value = params.get("q") || "";
  const allowedCategories = [...category.options].map((option) => option.value);
  if (allowedCategories.includes(params.get("category"))) category.value = params.get("category");
  if (["newest", "popular", "price-asc", "price-desc"].includes(params.get("sort"))) sort.value = params.get("sort");

  const update = () => {
    priceValue.textContent = Number(maxPrice.value) >= 500000 ? "Tous les prix" : `≤ ${formatMoney(Number(maxPrice.value))}`;
    const results = filterProducts(products, {
      query: search.value,
      category: category.value,
      maxPrice: Number(maxPrice.value),
      sort: sort.value
    });
    count.textContent = `${results.length} ${results.length === 1 ? "article trouvé" : "articles trouvés"}`;
    renderProductGrid(grid, results, "Aucun article ne correspond à votre recherche");
  };

  [search, category, maxPrice, sort].forEach((control) => control.addEventListener("input", update));
  document.querySelector("#reset-filters")?.addEventListener("click", () => {
    search.value = "";
    category.value = "";
    maxPrice.value = maxPrice.max;
    sort.value = "featured";
    update();
  });
  update();
}
