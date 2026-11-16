import { getProduct, products } from "../data/products.js";
import { getFavorites } from "../modules/favorites.js";
import { renderProductGrid } from "../modules/ui.js";

function renderFavorites() {
  const favorites = getFavorites().map(getProduct).filter(Boolean);
  renderProductGrid(document.querySelector("#favorite-products"), favorites, "Vos favoris vous attendent");
}

export function initFavorites() {
  document.addEventListener("kanto:favorites-updated", renderFavorites);
  renderFavorites();
}
