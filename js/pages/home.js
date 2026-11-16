import { products } from "../data/products.js";
import { renderProductGrid, showToast } from "../modules/ui.js";

export function initHome() {
  renderProductGrid(document.querySelector("#home-new-products"), products.filter((product) => product.isNew).slice(0, 4));
  renderProductGrid(document.querySelector("#home-popular-products"), products.filter((product) => product.popular).slice(0, 4));
  document.querySelector("#newsletter-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Merci ! Cette inscription est une démonstration, aucun e-mail n’a été enregistré.");
    event.currentTarget.reset();
  });
}
