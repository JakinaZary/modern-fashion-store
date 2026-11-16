import { getProduct, getCurrentPrice } from "../data/products.js";
import { getCart, getCartTotals, removeFromCart, updateCartQuantity } from "../modules/cart.js";
import { formatMoney, escapeHTML, showToast } from "../modules/ui.js";

function renderCart() {
  const root = document.querySelector("#cart-content");
  root.setAttribute("aria-busy", "false");
  const cart = getCart();
  if (!cart.length) {
    root.innerHTML = `<div class="empty-state"><h2>Votre panier est encore vide</h2><p>Quelques belles pièces vous attendent dans la boutique.</p><a class="button button-dark" href="shop.html">Découvrir la collection <span aria-hidden="true">→</span></a></div>`;
    return;
  }
  const totals = getCartTotals(cart);
  root.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${cart.map((item) => {
        const product = getProduct(item.productId);
        return `<article class="cart-row" data-cart-key="${escapeHTML(item.key)}">
          <a href="product.html?id=${encodeURIComponent(product.id)}"><img class="cart-thumb" src="${escapeHTML(product.images[0])}" alt="${escapeHTML(product.name)}" loading="lazy"></a>
          <div><h2><a href="product.html?id=${encodeURIComponent(product.id)}">${escapeHTML(product.name)}</a></h2>
            <p>${item.size ? `Taille : ${escapeHTML(item.size)} · ` : ""}${item.color ? `Couleur : ${escapeHTML(item.color)}` : ""}</p>
            <p>${formatMoney(getCurrentPrice(product))} / pièce</p>
            <div class="quantity-control"><button type="button" data-cart-step="-1" aria-label="Diminuer la quantité de ${escapeHTML(product.name)}">−</button><output>${item.quantity}</output><button type="button" data-cart-step="1" aria-label="Augmenter la quantité de ${escapeHTML(product.name)}">+</button></div>
          </div>
          <div class="cart-row-total"><span>${formatMoney(getCurrentPrice(product) * item.quantity)}</span><button class="remove-item" type="button" data-remove-item>Supprimer</button></div>
        </article>`;
      }).join("")}</div>
      <aside class="summary-card"><h2>Votre récapitulatif</h2>
        <p class="summary-line"><span>Sous-total</span><strong>${formatMoney(totals.subtotal)}</strong></p>
        <p class="summary-line"><span>Livraison standard</span><strong>${totals.shipping ? formatMoney(totals.shipping) : "Offerte"}</strong></p>
        <p class="summary-line summary-total"><span>Total estimé</span><strong>${formatMoney(totals.total)}</strong></p>
        <p class="summary-note">${totals.subtotal >= 300000 ? "Livraison offerte à partir de 300 000 Ar." : "Livraison offerte dès 300 000 Ar."}</p>
        <a class="button button-dark" href="checkout.html">Passer commande <span aria-hidden="true">→</span></a>
      </aside>
    </div>`;
}

export function initCart() {
  const root = document.querySelector("#cart-content");
  root.addEventListener("click", (event) => {
    const row = event.target.closest("[data-cart-key]");
    if (!row) return;
    if (event.target.closest("[data-remove-item]")) {
      removeFromCart(row.dataset.cartKey);
      showToast("Article retiré de votre panier.");
      return;
    }
    const step = event.target.closest("[data-cart-step]");
    if (step) {
      const current = Number(row.querySelector("output").textContent);
      updateCartQuantity(row.dataset.cartKey, current + Number(step.dataset.cartStep));
    }
  });
  document.addEventListener("kanto:cart-updated", renderCart);
  renderCart();
}
