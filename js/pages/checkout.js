import { getProduct, getCurrentPrice } from "../data/products.js";
import { clearCart, getCart, getCartTotals } from "../modules/cart.js";
import { writeStorage } from "../modules/storage.js";
import { formatMoney, escapeHTML, showToast } from "../modules/ui.js";

function currentCheckoutTotals(delivery) {
  const { subtotal } = getCartTotals();
  const shipping = delivery === "express" ? 25000 : (subtotal >= 300000 ? 0 : 15000);
  return { subtotal, shipping, total: subtotal + shipping };
}

function renderSummary(delivery = "standard") {
  const cart = getCart();
  const totals = currentCheckoutTotals(delivery);
  const root = document.querySelector("#checkout-summary");
  if (!root) return;
  root.innerHTML = `
    <h2>Votre récapitulatif</h2>
    ${cart.map((item) => {
      const product = getProduct(item.productId);
      return `<p class="summary-line"><span>${escapeHTML(product.name)} × ${item.quantity}${item.size ? ` · ${escapeHTML(item.size)}` : ""}${item.color ? ` · ${escapeHTML(item.color)}` : ""}</span><strong>${formatMoney(getCurrentPrice(product) * item.quantity)}</strong></p>`;
    }).join("")}
    <p class="summary-line"><span>Sous-total</span><strong>${formatMoney(totals.subtotal)}</strong></p>
    <p class="summary-line"><span>Livraison ${delivery === "express" ? "express" : "standard"}</span><strong>${totals.shipping ? formatMoney(totals.shipping) : "Offerte"}</strong></p>
    <p class="summary-line summary-total"><span>Total à régler</span><strong>${formatMoney(totals.total)}</strong></p>
    <p class="summary-note">Simulation uniquement · aucun paiement réel</p>`;
}

function renderCheckout() {
  const root = document.querySelector("#checkout-content");
  root.setAttribute("aria-busy", "false");
  if (!getCart().length) {
    root.innerHTML = `<div class="empty-state"><h2>Votre panier est vide</h2><p>Ajoutez d’abord une pièce à votre sélection.</p><a class="button button-dark" href="shop.html">Retour à la boutique <span aria-hidden="true">→</span></a></div>`;
    return;
  }
  root.innerHTML = `
    <div class="demo-notice"><strong>Commande de démonstration.</strong> Ce formulaire ne déclenche aucun achat, n'enregistre aucune commande sur un serveur et ne demande aucune donnée bancaire.</div>
    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form">
        <div class="form-field"><label for="customer-name">Nom complet</label><input id="customer-name" name="name" autocomplete="name" required minlength="2" placeholder="Ex. Soa Rakoto"></div>
        <div class="form-field"><label for="customer-email">Adresse e-mail</label><input id="customer-email" name="email" type="email" autocomplete="email" required placeholder="soa@exemple.mg"></div>
        <div class="form-field"><label for="customer-phone">Téléphone</label><input id="customer-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required minlength="8" maxlength="20" placeholder="+261 34 00 000 00"></div>
        <div class="form-field"><label for="customer-city">Ville de livraison</label><select id="customer-city" name="city" required><option value="">Choisir une ville</option><option>Antananarivo</option><option>Toamasina</option><option>Antsirabe</option><option>Mahajanga</option><option>Fianarantsoa</option><option>Autre ville</option></select></div>
        <div class="form-field full"><label for="customer-address">Adresse de livraison</label><input id="customer-address" name="address" autocomplete="street-address" required minlength="5" placeholder="Quartier, rue et repère"></div>
        <div class="form-field full"><label for="delivery-method">Mode de livraison simulé</label><select id="delivery-method" name="delivery"><option value="standard">Standard — 15 000 Ar (offerte dès 300 000 Ar)</option><option value="express">Express — 25 000 Ar</option></select></div>
        <button class="button button-dark" type="submit">Confirmer la commande démo <span aria-hidden="true">→</span></button>
      </form>
      <aside class="summary-card" id="checkout-summary" aria-live="polite"></aside>
    </div>`;
  const form = root.querySelector("#checkout-form");
  const delivery = root.querySelector("#delivery-method");
  delivery.addEventListener("change", () => renderSummary(delivery.value));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const cart = getCart();
    if (!cart.length) {
      showToast("Votre panier est vide.", "error");
      renderCheckout();
      return;
    }
    const totals = currentCheckoutTotals(delivery.value);
    const orderId = `KW-DEMO-${Date.now().toString(36).toUpperCase()}`;
    const items = cart.map((item) => {
      const product = getProduct(item.productId);
      return {
        productId: product.id,
        name: product.name,
        price: getCurrentPrice(product),
        size: item.size,
        color: item.color,
        quantity: item.quantity
      };
    });
    writeStorage("order", {
      id: orderId,
      createdAt: new Date().toISOString(),
      items,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      delivery: delivery.value
    });
    clearCart();
    window.location.href = "confirmation.html";
  });
  renderSummary(delivery.value);
}

export function initCheckout() {
  renderCheckout();
}
